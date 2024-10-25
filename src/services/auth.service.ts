'use server';

import env from '@/config/env';
import nexios from '@/lib/nexios';
import { IUser } from '@/types';
import { IAuthResponse, IResponse, IUserResponse } from '@/types/global.type';
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

export const forgetPassword = async (fieldValues: FieldValues) => {
  const { data } = await nexios.post<IResponse<null>>(
    '/auth/forget-password',
    fieldValues
  );

  return data;
};

export const resetPassword = async (fieldValues: FieldValues) => {
  const { data } = await nexios.put<IResponse<null>>(
    '/auth/reset-password',
    fieldValues
  );

  return data;
};

export const getCurrentUser = async () => {
  const accessToken = cookies().get('accessToken')?.value;

  let decodedToken: IUser | null = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);
  }

  return decodedToken;
};

export const getAuthUser = async (): Promise<IUserResponse | null> => {
  const res = await fetch(`${env.base_url}/users/me`, {
    headers: {
      Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
    },
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
};
