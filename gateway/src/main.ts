import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import * as express from 'express';

import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import * as morgan from 'morgan';

import { AppModule } from './app.module';
import { ENVIRONMENT, USER_CORS_ORIGIN, USER_GATEWAY_PORT } from './common/constants';
import { HttpCommonExceptionFilter } from './common/filters';
import { ENV, PROTOCOL } from './constants';
import { StatusInterceptor } from './interceptors';


async function bootstrap() {
  const server = express();

  const app = await NestFactory.create(AppModule, new ExpressAdapter(server), { cors: true });

  app.useGlobalFilters(new HttpCommonExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalInterceptors(new StatusInterceptor());
  app.setGlobalPrefix('api/v1');

  app.use(cookieParser());
  app.use(helmet());
  app.enableCors({
    origin: USER_CORS_ORIGIN,
  });

  if (ENVIRONMENT === ENV.DEV) {
    app.use(morgan('tiny'));
  }

  const options = new DocumentBuilder()
    .setTitle('API docs')
    .addServer(ENVIRONMENT === ENV.PROD ? PROTOCOL.HTTPS : PROTOCOL.HTTP)
    .addTag('users')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(USER_GATEWAY_PORT);
}

bootstrap();
