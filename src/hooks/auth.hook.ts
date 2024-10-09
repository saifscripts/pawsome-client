import { useAuth } from '@/contexts/auth.context';
import { getMe, loginUser, registerUser } from '@/services/auth-services';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';

export const useUserRegistration = () => {
  const router = useRouter();
  const { setIsLoading } = useAuth();

  return useMutation<any, Error, FieldValues>({
    mutationKey: ['REGISTRATION'],
    mutationFn: registerUser,
    onSuccess: (data) => {
      if (data?.success) {
        setIsLoading(true);
        router.push('/');
        toast.success('Successfully registered!');
      } else {
        toast.error(data?.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUserLogin = () => {
  const router = useRouter();
  const { setIsLoading } = useAuth();

  return useMutation<any, Error, FieldValues>({
    mutationKey: ['LOGIN'],
    mutationFn: loginUser,
    onSuccess: (data) => {
      if (data?.success) {
        setIsLoading(true);
        router.push('/');
        toast.success('Successfully logged in!');
      } else {
        toast.error(data?.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUser = () => {
  return useQuery({
    queryKey: ['USER'],
    queryFn: async () => await getMe(),
  });
};
