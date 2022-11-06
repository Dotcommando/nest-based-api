import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { UserSchema } from './schemas';
import { DbAccessService, MongoConfigService, UsersService } from './services';
import configuration from './services/config';
import { UsersController } from './users.controller';


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      useClass: MongoConfigService,
    }),
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
        collection: 'users',
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [
    DbAccessService,
    UsersService,
  ],
})
export class UsersModule {}
