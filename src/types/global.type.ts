import { SVGProps } from 'react';

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