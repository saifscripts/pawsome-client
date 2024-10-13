import {
  createPost,
  deletePost,
  downvotePost,
  upvotePost,
} from '@/services/post-services';
import { IPost, IPostResponse } from '@/types';
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
        queryClient.invalidateQueries({ queryKey: ['USER'] });
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

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, string>({
    mutationKey: ['POST'],
    mutationFn: deletePost,
    onSuccess: (data) => {
      if (data?.success) {
        queryClient.invalidateQueries({ queryKey: ['POST'] });
        queryClient.invalidateQueries({ queryKey: ['USER'] });
        toast.success('Post deleted successfully!');
      } else {
        toast.error(data?.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUpvotePost = (post: IPost) => {
  return useMutation<any, Error, string>({
    mutationKey: ['POST'],
    mutationFn: upvotePost,
    onSuccess: (data: IPostResponse) => {
      const updatedPost = data?.data;
      if (data?.success) {
        post.upvotes = updatedPost.upvotes;
        post.downvotes = updatedPost.downvotes;
      } else {
        toast.error(data?.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDownvotePost = (post: IPost) => {
  return useMutation<any, Error, string>({
    mutationKey: ['POST'],
    mutationFn: downvotePost,
    onSuccess: (data: IPostResponse) => {
      const updatedPost = data?.data;
      if (data?.success) {
        post.upvotes = updatedPost.upvotes;
        post.downvotes = updatedPost.downvotes;
      } else {
        toast.error(data?.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
