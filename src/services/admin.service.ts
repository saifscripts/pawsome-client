'use server';

import axios from '@/lib/axios';
import {
  IPayment,
  IPost,
  IPostResponse,
  IResponse,
  IUser,
  IUserResponse,
} from '@/types';
import { AxiosError } from 'axios';

// POST
export const getAllPosts = async (page: string = '1') => {
  try {
    const { data } = await axios.get<IResponse<IPost[]>>(
      `/admin/posts?page=${page}`
    );
    return data;
  } catch (error) {
    throw new Error((error as AxiosError<any>)?.response?.data?.message);
  }
};

export const publishPost = async (id: string) => {
  const { data } = await axios.put<IPostResponse>(`/admin/posts/${id}/publish`);
  return data;
};

export const unpublishPost = async (id: string) => {
  const { data } = await axios.put<IPostResponse>(
    `/admin/posts/${id}/unpublish`
  );
  return data;
};

// USER
export const getAllUsers = async (page: string = '1') => {
  try {
    const { data } = await axios.get<IResponse<IUser[]>>(
      `/admin/users?page=${page}`
    );
    return data;
  } catch (error) {
    throw new Error((error as AxiosError<any>)?.response?.data?.message);
  }
};

export const deleteUser = async (id: string) => {
  const { data } = await axios.delete<IUserResponse>(
    `/admin/users/${id}/delete`
  );
  return data;
};

export const blockUser = async (id: string) => {
  const { data } = await axios.put<IUserResponse>(`/admin/users/${id}/block`);
  return data;
};

export const unblockUser = async (id: string) => {
  const { data } = await axios.put<IUserResponse>(`/admin/users/${id}/unblock`);
  return data;
};

export const makeAdmin = async (id: string) => {
  const { data } = await axios.put<IUserResponse>(
    `/admin/users/${id}/make-admin`
  );
  return data;
};

export const removeAdmin = async (id: string) => {
  const { data } = await axios.put<IUserResponse>(
    `/admin/users/${id}/remove-admin`
  );
  return data;
};

// PAYMENT
export const getAllPayments = async (page: string = '1') => {
  try {
    const { data } = await axios.get<IResponse<IPayment[]>>(
      `/admin/payments?page=${page}`
    );
    return data;
  } catch (error) {
    throw new Error((error as AxiosError<any>)?.response?.data?.message);
  }
};
