'use server';

import axios from '@/lib/axios';
import { IPostResponse } from '@/types';

export const createPost = async (formData: FormData) => {
  const { data } = await axios.post<IPostResponse>('/posts/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

export const upvotePost = async (id: string) => {
  const { data } = await axios.put<IPostResponse>(`/posts/${id}/upvote`);
  return data;
};

export const downvotePost = async (id: string) => {
  const { data } = await axios.put<IPostResponse>(`/posts/${id}/downvote`);
  return data;
};
