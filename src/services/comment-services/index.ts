'use server';

import axios from '@/lib/axios';
import { ICommentResponse } from '@/types';
import { AxiosError } from 'axios';
import { FieldValues } from 'react-hook-form';

export const createComment = async (fieldValues: FieldValues) => {
  try {
    const { data } = await axios.post<ICommentResponse>(
      '/comments/',
      fieldValues
    );
    return data;
  } catch (error) {
    throw new Error((error as AxiosError<any>)?.response?.data?.message);
  }
};
