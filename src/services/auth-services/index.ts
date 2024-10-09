'use server';

import nexios from '@/lib/nexios';
import { IAuthResponse } from '@/types';
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
