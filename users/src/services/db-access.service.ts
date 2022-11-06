import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import ObjectId from 'bson-objectid';
import { Model } from 'mongoose';

import { EMAIL_REGEXP, USERNAME_REGEXP } from '../common/constants';
import { AddressedErrorCatching, ApplyAddressedErrorCatching } from '../common/decorators';
import { PartialUserDto } from '../common/dto';
import { IUser } from '../common/types';
import { DEFAULT_USER_DATA } from '../constants';
import { mapUserDocumentToIUser } from '../helpers';
import { IUserDocument } from '../types';


@ApplyAddressedErrorCatching
@Injectable()
export class DbAccessService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<IUserDocument>,
  ) {
  }

  @AddressedErrorCatching()
  public async checkUsernameOccupation(username: string): Promise<{ occupied: boolean }> {
    if (typeof username !== 'string' || !USERNAME_REGEXP.test(username)) {
      throw new BadRequestException('Email is not valid');
    }

    const userDoc = await this.userModel.findOne({ username });

    return { occupied: Boolean(userDoc) };
  }

  @AddressedErrorCatching()
  public async checkEmailOccupation(email: string): Promise<{ occupied: boolean }> {
    if (typeof email !== 'string' || !EMAIL_REGEXP.test(email)) {
      throw new BadRequestException('Email is not valid');
    }

    const userDoc = await this.userModel.findOne({ email });

    return { occupied: Boolean(userDoc) };
  }

  @AddressedErrorCatching()
  public async saveNewUser(user: PartialUserDto): Promise<{ user: IUser }> {
    const userDoc: IUserDocument = new this.userModel({ ...DEFAULT_USER_DATA, ...user });
    const savedUserDoc = await userDoc.save();

    return { user: mapUserDocumentToIUser(savedUserDoc) };
  }

  @AddressedErrorCatching()
  public async findManyUsers(userIds: Array<string | ObjectId>): Promise<IUser[] | null> {
    const ids = userIds.map((userId: string | ObjectId) => ObjectId.isValid(userId as ObjectId)
      ? userId
      : new ObjectId(userId as string));
    const userDocs: IUserDocument[] = await this.userModel.find({
      _id: { $in: ids },
    });

    if (!userDocs || !userDocs.length) {
      return null;
    }

    return userDocs.map((userDoc: IUserDocument) => mapUserDocumentToIUser(userDoc));
  }

  public async findUserById(userId: string | ObjectId): Promise<IUser | null> {
    return (await this.findManyUsers([userId]))?.[0] ?? null;
  }
}
