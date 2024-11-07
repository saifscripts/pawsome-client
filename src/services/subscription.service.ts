'use server';

import axios from '@/lib/axios';
import { IInitiatePayment, IPayment, IResponse } from '@/types';
import { AxiosError } from 'axios';

export const initiatePayment = async (options: IInitiatePayment) => {
  try {
    const { data } = await axios.post<IResponse<{ payment_url: string }>>(
      `/payments/initiate-payment?redirectPath=${options.redirectPath}`,
      options
    );
    return data;
  } catch (error) {
    throw new Error((error as AxiosError<any>)?.response?.data?.message);
  }
};

export const getMySubscriptions = async (page: string = '1') => {
  try {
    const { data } = await axios.get<IResponse<IPayment[]>>(
      `/payments/my-subscriptions?page=${page}`
    );
    return data;
  } catch (error) {
    throw new Error((error as AxiosError<any>)?.response?.data?.message);
  }
};
