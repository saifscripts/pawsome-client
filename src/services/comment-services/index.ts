'use server';

import axios from '@/lib/axios';
import { IComment, ICommentResponse, IResponse } from '@/types';
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

export const getComments = async (postId: string) => {
  try {
    const { data } = await axios.get<IResponse<IComment[]>>(
      `/comments/post/${postId}`
    );
    return data;
  } catch (error) {
    throw new Error((error as AxiosError<any>)?.response?.data?.message);
  }
};

export const deleteComment = async (commentId: string) => {
  try {
    const { data } = await axios.delete<IResponse<IComment>>(
      `/comments/${commentId}`
    );
    return data;
  } catch (error) {
    throw new Error((error as AxiosError<any>)?.response?.data?.message);
  }
};
