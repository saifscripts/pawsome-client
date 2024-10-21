import { initiatePayment } from '@/services/subscription.service';
import { IInitiatePayment } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
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
