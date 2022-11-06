import ObjectId from 'bson-objectid';

import { ROLE } from '../constants';

export interface IUser {
  _id: ObjectId;
  firstName: string;
  middleName?: string;
  lastName: string;
  username?: string;
  email: string;
  phoneNumber?: string;
  role: ROLE;
  emailConfirmed: boolean;
  phoneConfirmed: boolean;
  deactivated: boolean;
}
