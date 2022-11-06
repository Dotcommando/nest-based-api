import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';

import { USER_SERVICE_HOST, USER_SERVICE_PORT } from './common/constants';
import { UsersModule } from './users.module';


async function bootstrap() {
  const app = await NestFactory.createMicroservice(UsersModule, {
    transport: Transport.TCP,
    options: {
      host: USER_SERVICE_HOST,
      port: USER_SERVICE_PORT,
    },
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  await app.listen();
}

bootstrap();
