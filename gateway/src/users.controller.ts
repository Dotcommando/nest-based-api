import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateUserBodyDto, GetUserParamDto } from './dto';
import { UsersService } from './services';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {
  }

  @Get('one/:_id')
  public async getUser(
    @Param() param: GetUserParamDto,
  ) {
    return await this.usersService.getUser(param._id);
  }

  @Post('one')
  public async createUser(
    @Body() body: CreateUserBodyDto,
  ) {
    return await this.usersService.createUser(body);
  }
}
