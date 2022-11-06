import { ROLE } from '../common/constants';
import { IUser } from '../common/types';

export const DEFAULT_USER_DATA: Omit<IUser, '_id'> = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  role: ROLE.USER,
  emailConfirmed: false,
  phoneConfirmed: false,
  deactivated: false,
};
