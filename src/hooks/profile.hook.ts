import {
  getMe,
  getUser,
  updateProfile,
  uploadAvatar,
} from '@/services/profile-services';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';

export const useUploadAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FormData>({
    mutationKey: ['UPLOAD_AVATAR'],
    mutationFn: uploadAvatar,
    onSuccess: (data) => {
      if (data?.success) {
        queryClient.invalidateQueries({ queryKey: ['ME'] });
        toast.success('Avatar updated successfully!');
      } else {
        toast.error(data?.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useMe = () => {
  return useQuery({
    queryKey: ['ME'],
    queryFn: async () => await getMe(),
  });
};

export const useUser = () => {
  const { userId } = useParams();

  return useQuery({
    queryKey: ['USER'],
    queryFn: async () => await getUser(userId as string),
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationKey: ['ME'],
    mutationFn: updateProfile,
    onSuccess: (data) => {
      if (data?.success) {
        queryClient.invalidateQueries({ queryKey: ['USER'] });
        queryClient.invalidateQueries({ queryKey: ['ME'] });
        toast.success('Profile updated successfully!');
      } else {
        toast.error(data?.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
