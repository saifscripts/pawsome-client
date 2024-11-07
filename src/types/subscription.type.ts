import { PaymentStatus, SubscriptionTypes } from '@/constants';
import { IUser } from './user.type';

export interface IInitiatePayment {
  subscriptionType: 'monthly' | 'yearly';
  redirectPath: string;
}

export type ISubscriptionType = (typeof SubscriptionTypes)[number];
export type IPaymentStatus = (typeof PaymentStatus)[number];

export interface IPayment {
  _id: string;
  user: IUser;
  amount: number;
  subscriptionType: ISubscriptionType;
  status: IPaymentStatus;
  txnId: string;
  isDeleted: boolean;
}
