import {
  createComment,
  deleteComment,
  editComment,
  getComments,
} from '@/services/comment.service';
import { IPost } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';

export const useCreateComment = (post: IPost) => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationKey: ['COMMENT', post._id],
    mutationFn: createComment,
    onSuccess: (data) => {
      if (data?.success) {
        queryClient.invalidateQueries({ queryKey: ['USER'] });
        queryClient.invalidateQueries({ queryKey: ['COMMENTS', post._id] });
        post.comments.push(data.data._id);
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

export const useGetComments = (postId: string) => {
  const result = useQuery({
    queryKey: ['COMMENTS', postId],
    queryFn: async () => await getComments(postId),
  });

  const comments = result?.data?.data;

  return { comments, ...result };
};

export const useDeleteComment = (post: IPost) => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, string>({
    mutationKey: ['COMMENT'],
    mutationFn: deleteComment,
    onSuccess: (data) => {
      if (data?.success) {
        queryClient.invalidateQueries({ queryKey: ['USER'] });
        queryClient.invalidateQueries({ queryKey: ['COMMENTS', post._id] });
        post.comments = post.comments.filter((id) => id !== data.data._id);
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

export const useEditComment = (postId: string) => {
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
        queryClient.invalidateQueries({ queryKey: ['COMMENTS', postId] });
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
