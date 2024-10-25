'use server';

import env from '@/config/env';
import axios from '@/lib/axios';
import { IPostResponse } from '@/types';
import { AxiosError } from 'axios';
import { cookies } from 'next/headers';

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
  const res = await fetch(`${env.base_url}/posts/${id}`, {
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch post!');
  }

  return res.json();
};

export const getPosts = async (params: URLSearchParams) => {
  const searchParams = new URLSearchParams(params);

  const res = await fetch(`${env.base_url}/posts?${searchParams.toString()}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch posts!');
  }

  return res.json();
};

export const getTags = async (limit?: number) => {
  const searchParams = new URLSearchParams();
  if (limit) searchParams.set('limit', String(limit));

  const { data } = await axios.get(`/posts/tags?${searchParams.toString()}`);

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
