'use server';

import nexios from '@/lib/nexios';
import { IUser } from '@/types';
import { IAuthResponse, IUserResponse } from '@/types/global.type';
import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';
import { FieldValues } from 'react-hook-form';

export const registerUser = async (userData: FieldValues) => {
  const { data } = await nexios.post<IAuthResponse>('/auth/register', userData);

  if (data.success) {
    cookies().set('accessToken', data?.data?.accessToken);
    cookies().set('refreshToken', data?.data?.refreshToken);
  }

  return data;
};

export const loginUser = async (userData: FieldValues) => {
  const { data } = await nexios.post<IAuthResponse>('/auth/login', userData);

  if (data.success) {
    cookies().set('accessToken', data?.data?.accessToken);
    cookies().set('refreshToken', data?.data?.refreshToken);
  }

  return data;
};

export const logoutUser = () => {
  cookies().delete('accessToken');
  cookies().delete('refreshToken');
};

export const getCurrentUser = async () => {
  const accessToken = cookies().get('accessToken')?.value;

  let decodedToken: IUser | null = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);
  }

  return decodedToken;
};

export const getMe = async () => {
  const { data } = await nexios.get<IUserResponse>('/users/me');
  return data;
};
