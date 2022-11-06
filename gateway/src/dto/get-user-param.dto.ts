import { PickType } from '@nestjs/swagger';

import { UserDto } from '../common/dto';


export class GetUserParamDto extends PickType(UserDto, ['_id']) {}
