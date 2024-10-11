'use server';

import axios from '@/lib/axios';
import { IUserResponse } from '@/types';

export const getMe = async () => {
  const { data } = await axios.get<IUserResponse>('/users/me');
  console.log(data);
  return data;
};

export const uploadAvatar = async (formData: FormData) => {
  const { data } = await axios.post<IUserResponse>('/users/avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};
