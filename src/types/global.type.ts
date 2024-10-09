import { SVGProps } from 'react';
import { IUser } from './user.type';

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface IResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export type IAuthResponse = IResponse<{
  accessToken: string;
  refreshToken: string;
}>;

export type IUserResponse = IResponse<IUser>;
