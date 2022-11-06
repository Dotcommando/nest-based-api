import { Controller, UseFilters } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { USERS_EVENTS } from './common/constants';
import { TcpCommonExceptionFilter } from './common/filters';
import { IResponse, IUser } from './common/types';
import {
  CreateUserBodyDto,
  GetUserBodyDto,
} from './dto';
import { UsersService } from './services';


@UseFilters(new TcpCommonExceptionFilter())
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(USERS_EVENTS.USER_CREATE_USER)
  public async createUser(user: CreateUserBodyDto): Promise<IResponse<{ user: IUser }>> {
    return await this.usersService.createUser(user);
  }

  @MessagePattern(USERS_EVENTS.USER_GET_USER)
  public async getUser(user: GetUserBodyDto): Promise<IResponse<{ user: IUser }>> {
    return await this.usersService.getUser(user);
  }
}
