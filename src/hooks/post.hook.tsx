import {
  createPost,
  deletePost,
  downvotePost,
  editPost,
  getMyPosts,
  getPost,
  getTags,
  upvotePost,
} from '@/services/post.service';
import { IPost, IPostResponse, IResponse } from '@/types';
import { Button } from '@nextui-org/button';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const useGetPost = (id: string) => {
  return useQuery<any, Error, IPostResponse>({
    queryKey: ['POST'],
    queryFn: async () => await getPost(id),
  });
};

export const useGetMyPosts = () => {
  return useQuery<any, Error, IResponse<IPost[]>>({
    queryKey: ['MY_POSTS'],
    queryFn: async () => await getMyPosts(),
  });
};

export const useGetTags = (limit?: number) => {
  return useQuery<any, Error, IResponse<{ _id: string; count: number }[]>>({
    queryKey: ['TAGS'],
    queryFn: async () => await getTags(limit),
  });
};

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

export const useEditPost = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, { id: string; formData: FormData }>({
    mutationKey: ['POST'],
    mutationFn: editPost,
    onSuccess: (data) => {
      if (data?.success) {
        queryClient.invalidateQueries({ queryKey: ['POST'] });
        queryClient.invalidateQueries({ queryKey: ['USER'] });
        toast.success('Post updated successfully!');
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
        queryClient.invalidateQueries({ queryKey: ['MY_POSTS'] });
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
  const router = useRouter();

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
      if (error.message === 'You are not authorized!') {
        toast.error('You must be signed in to upvote a post!', {
          action: (
            <Button
              onClick={() => router.push('/login')}
              color="primary"
              size="sm"
            >
              Sign In
            </Button>
          ),
        });
      } else {
        toast.error(error.message);
      }
    },
  });
};

export const useDownvotePost = (post: IPost) => {
  const router = useRouter();

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
      if (error.message === 'You are not authorized!') {
        toast.error('You must be signed in to downvote a post!', {
          action: (
            <Button
              onClick={() => router.push('/login')}
              color="primary"
              size="sm"
            >
              Sign In
            </Button>
          ),
        });
      } else {
        toast.error(error.message);
      }
    },
  });
};
