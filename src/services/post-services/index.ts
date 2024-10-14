'use server';

import axios from '@/lib/axios';
import { IPostResponse } from '@/types';
import { AxiosError } from 'axios';

export const createPost = async (formData: FormData) => {
  try {
    const { data } = await axios.post<IPostResponse>('/posts/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  } catch (error) {
    throw new Error((error as AxiosError<any>)?.response?.data?.message);
  }
};

export const getPost = async (id: string) => {
  const { data } = await axios.get<IPostResponse>(`/posts/${id}`);
  return data;
};

export const editPost = async (options: { id: string; formData: FormData }) => {
  const { data } = await axios.put<IPostResponse>(
    `/posts/${options.id}`,
    options.formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return data;
};

export const deletePost = async (id: string) => {
  const { data } = await axios.delete<IPostResponse>(`/posts/${id}`);
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
