import {
  getMySubscriptions,
  initiatePayment,
} from '@/services/subscription.service';
import { IInitiatePayment, IPayment, IResponse } from '@/types';
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export const useInitiatePayment = () => {
  const router = useRouter();

  return useMutation<any, Error, IInitiatePayment>({
    mutationKey: ['INITIATE_PAYMENT'],
    mutationFn: initiatePayment,
    onSuccess: (data) => {
      if (data?.success) {
        router.push(data?.data?.payment_url);
      } else {
        toast.error(data?.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetMySubscriptions = () => {
  const [page, setPage] = useState('1');
  const searchParams = useSearchParams();

  useEffect(() => {
    setPage(searchParams.get('page') || '1');
  }, [searchParams]);

  return useQuery<any, Error, IResponse<IPayment[]>>({
    queryKey: ['MY_SUBSCRIPTIONS', page],
    queryFn: async () => await getMySubscriptions(page),
    placeholderData: keepPreviousData,
  });
};
