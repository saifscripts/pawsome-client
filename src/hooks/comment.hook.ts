import { createComment, getComments } from '@/services/comment-services';
import { IPost } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';

export const useCreateComment = (post: IPost) => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ['COMMENT'],
    mutationFn: createComment,
    onSuccess: (data) => {
      if (data?.success) {
        post.comments.push(data?.data);
        toast.success('Comment added successfully!');
      } else {
        toast.error(data?.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useComments = (postId: string) => {
  return useQuery({
    queryKey: ['COMMENTS'],
    queryFn: async () => await getComments(postId),
  });
};
