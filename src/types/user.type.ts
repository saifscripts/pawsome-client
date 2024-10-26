import { UserRoles, UserStatus, UserType } from '@/constants';
import { IPost } from './post.type';

export type IUserRole = (typeof UserRoles)[number];
export type IUserStatus = (typeof UserStatus)[number];
export type IUserType = (typeof UserType)[number];

export type ISubscription = {
  startDate: Date;
  endDate: Date;
};

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  phone: string;
  avatarURL?: string;
  role: IUserRole;
  status: IUserStatus;
  userType: IUserType;
  subscription: ISubscription;
  followers: IUser[];
  following: IUser[];
  posts: IPost[];
  createdAt: Date;
  isDeleted: boolean;
}

export interface IDecodedUser {
  id: string;
  role: IUserRole;
}

export interface ILoginCredentials {
  email: string;
  password: string;
}

export interface IContactUsOptions {
  name: string;
  email: string;
  phone: string;
  message: string;
}
