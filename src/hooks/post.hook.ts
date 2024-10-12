import { createPost } from '@/services/post-services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FormData>({
    mutationKey: ['POST'],
    mutationFn: createPost,
    onSuccess: (data) => {
      if (data?.success) {
        queryClient.invalidateQueries({ queryKey: ['POST'] });
        toast.success('Post created successfully!');
      } else {
        toast.error(data?.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
