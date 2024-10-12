'use server';

import axios from '@/lib/axios';
import { IUserResponse } from '@/types';
import { AxiosError } from 'axios';
import { FieldValues } from 'react-hook-form';

export const getMe = async () => {
  const { data } = await axios.get<IUserResponse>('/users/me');
  return data;
};

export const getUser = async (id: string) => {
  const { data } = await axios.get<IUserResponse>(`/users/${id}`);
  return data;
};

export const updateProfile = async (fieldValues: FieldValues) => {
  try {
    const { data } = await axios.put<IUserResponse>('/users/me', fieldValues);
    return data;
  } catch (error) {
    throw new Error((error as AxiosError<any>)?.response?.data?.message);
  }
};

export const uploadAvatar = async (formData: FormData) => {
  const { data } = await axios.post<IUserResponse>('/users/avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};
