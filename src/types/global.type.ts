import { SVGProps } from 'react';
import { IComment } from './comment.type';
import { IPost } from './post.type';
import { IUser } from './user.type';

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  meta?: {
    total: number;
    page: number;
    totalPages: number;
    limit: number;
  };
}

export type IAuthResponse = IResponse<{
  accessToken: string;
  refreshToken: string;
}>;

export type IUserResponse = IResponse<IUser>;
export type IPostResponse = IResponse<IPost>;
export type ICommentResponse = IResponse<IComment>;
