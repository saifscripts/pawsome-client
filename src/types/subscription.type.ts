export interface IInitiatePayment {
  subscriptionType: 'monthly' | 'yearly';
  redirectPath: string;
}
