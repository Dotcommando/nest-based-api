import { PickType } from '@nestjs/swagger';

import { UserDto } from '../common/dto';


export class GetUserBodyDto extends PickType(UserDto, ['_id']) {}
