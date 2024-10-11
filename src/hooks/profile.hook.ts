import {
  getMe,
  updateProfile,
  uploadAvatar,
} from '@/services/profile-services';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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

export const useUser = () => {
  return useQuery({
    queryKey: ['ME'],
    queryFn: async () => await getMe(),
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationKey: ['ME'],
    mutationFn: updateProfile,
    onSuccess: (data) => {
      console.log(data);
      if (data?.success) {
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
