export const SUBSCRIPTION_TYPE = {
  MONTHLY: 'monthly',
  YEARLY: 'yearly',
} as const;

export const SubscriptionTypes = ['monthly', 'yearly'] as const;

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  SUCCESS: 'success',
  FAILED: 'failed',
} as const;

export const PaymentStatus = ['pending', 'success', 'failed'] as const;
