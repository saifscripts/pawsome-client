'use server';

import axios from '@/lib/axios';
import { IInitiatePayment, IResponse } from '@/types';
import { AxiosError } from 'axios';

export const initiatePayment = async (options: IInitiatePayment) => {
  try {
    const { data } = await axios.post<IResponse<{ payment_url: string }>>(
      '/payments/initiate-payment',
      options
    );
    return data;
  } catch (error) {
    throw new Error((error as AxiosError<any>)?.response?.data?.message);
  }
};
