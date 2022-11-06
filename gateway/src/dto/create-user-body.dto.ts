import { IntersectionType, PickType } from '@nestjs/mapped-types';

import { PartialUserDto, UserDto } from '../common/dto';

export class CreateUserBodyDto extends IntersectionType(
  PickType(UserDto, [ 'firstName', 'lastName', 'email', 'password' ]),
  PickType(PartialUserDto, [ 'middleName', 'username', 'phoneNumber' ]),
) {
}
