import {
  createComment,
  deleteComment,
  editComment,
  getComments,
} from '@/services/comment-services';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationKey: ['COMMENT'],
    mutationFn: createComment,
    onSuccess: (data) => {
      if (data?.success) {
        queryClient.invalidateQueries({ queryKey: ['USER'] });
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

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, string>({
    mutationKey: ['COMMENT'],
    mutationFn: deleteComment,
    onSuccess: (data) => {
      if (data?.success) {
        // post.comments = post.comments.filter(
        //   (comment) => comment._id !== data?.data?._id
        // );
        queryClient.invalidateQueries({ queryKey: ['USER'] });
        toast.success('Comment deleted successfully!');
      } else {
        toast.error(data?.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useEditComment = () => {
  const queryClient = useQueryClient();
  return useMutation<
    any,
    Error,
    {
      id: string;
      data: FieldValues;
    }
  >({
    mutationKey: ['COMMENT'],
    mutationFn: editComment,
    onSuccess: (data) => {
      if (data?.success) {
        queryClient.invalidateQueries({ queryKey: ['USER'] });
        toast.success('Comment edited successfully!');
      } else {
        toast.error(data?.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
