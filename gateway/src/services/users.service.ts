import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { lastValueFrom, timeout } from 'rxjs';

import ObjectId from 'bson-objectid';

import { MAX_TIME_OF_REQUEST_WAITING, USERS_EVENTS } from '../common/constants';
import { IResponse, IUser } from '../common/types';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
  ) {
  }

  public async getUser(_id: ObjectId): Promise<IResponse<IUser>> {
    return await lastValueFrom(
      this.userServiceClient
        .send(USERS_EVENTS.USER_GET_USER, { _id })
        .pipe(timeout(MAX_TIME_OF_REQUEST_WAITING)),
    );
  }

  public async createUser(user: Omit<IUser, '_id' | 'role' | 'emailConfirmed' | 'phoneConfirmed' | 'deactivated'>): Promise<IResponse<IUser>> {
    return await lastValueFrom(
      this.userServiceClient
        .send(USERS_EVENTS.USER_CREATE_USER, user)
        .pipe(timeout(MAX_TIME_OF_REQUEST_WAITING)),
    );
  }
}
