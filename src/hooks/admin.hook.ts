import {
  blockUser,
  deleteUser,
  getAllPayments,
  getAllPosts,
  getAllUsers,
  makeAdmin,
  publishPost,
  removeAdmin,
  unblockUser,
  unpublishPost,
} from '@/services/admin.service';
import { IPost, IPostResponse, IResponse, IUser, IUserResponse } from '@/types';
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

// POST
export const useGetAllPosts = () => {
  const [page, setPage] = useState('1');
  const searchParams = useSearchParams();

  useEffect(() => {
    setPage(searchParams.get('page') || '1');
  }, [searchParams]);

  return useQuery<any, Error, IResponse<IPost[]>>({
    queryKey: ['ALL_POSTS', page],
    queryFn: async () => await getAllPosts(page),
    placeholderData: keepPreviousData,
  });
};

export const usePublishPost = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, string>({
    mutationKey: ['POST'],
    mutationFn: publishPost,
    onSuccess: (data: IPostResponse) => {
      if (data?.success) {
        toast.success('Post published successfully!');
        queryClient.invalidateQueries({ queryKey: ['ALL_POSTS'] });
      } else {
        toast.error(data?.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUnpublishPost = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, string>({
    mutationKey: ['POST'],
    mutationFn: unpublishPost,
    onSuccess: (data: IPostResponse) => {
      if (data?.success) {
        toast.success('Post unpublished successfully!');
        queryClient.invalidateQueries({ queryKey: ['ALL_POSTS'] });
      } else {
        toast.error(data?.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// USER
export const useGetAllUsers = () => {
  const [page, setPage] = useState('1');
  const searchParams = useSearchParams();

  useEffect(() => {
    setPage(searchParams.get('page') || '1');
  }, [searchParams]);

  return useQuery<any, Error, IResponse<IUser[]>>({
    queryKey: ['ALL_USERS', page],
    queryFn: async () => await getAllUsers(page),
    placeholderData: keepPreviousData,
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, string>({
    mutationKey: ['USER'],
    mutationFn: deleteUser,
    onSuccess: (data: IUserResponse) => {
      if (data?.success) {
        toast.success('User deleted successfully!');
        queryClient.invalidateQueries({ queryKey: ['ALL_USERS'] });
      } else {
        toast.error(data?.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useBlockUser = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, string>({
    mutationKey: ['USER'],
    mutationFn: blockUser,
    onSuccess: (data: IUserResponse) => {
      if (data?.success) {
        toast.success('User blocked successfully!');
        queryClient.invalidateQueries({ queryKey: ['ALL_USERS'] });
      } else {
        toast.error(data?.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUnblockUser = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, string>({
    mutationKey: ['USER'],
    mutationFn: unblockUser,
    onSuccess: (data: IUserResponse) => {
      if (data?.success) {
        toast.success('User unblocked successfully!');
        queryClient.invalidateQueries({ queryKey: ['ALL_USERS'] });
      } else {
        toast.error(data?.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useMakeAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, string>({
    mutationKey: ['USER'],
    mutationFn: makeAdmin,
    onSuccess: (data: IUserResponse) => {
      if (data?.success) {
        toast.success('User is now an admin!');
        queryClient.invalidateQueries({ queryKey: ['ALL_USERS'] });
      } else {
        toast.error(data?.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useRemoveAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, string>({
    mutationKey: ['USER'],
    mutationFn: removeAdmin,
    onSuccess: (data: IUserResponse) => {
      if (data?.success) {
        toast.success('User is no longer an admin!');
        queryClient.invalidateQueries({ queryKey: ['ALL_USERS'] });
      } else {
        toast.error(data?.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// PAYMENT
export const useGetAllPayments = () => {
  const [page, setPage] = useState('1');
  const searchParams = useSearchParams();

  useEffect(() => {
    setPage(searchParams.get('page') || '1');
  }, [searchParams]);

  return useQuery<any, Error, IResponse<IUser[]>>({
    queryKey: ['ALL_PAYMENTS', page],
    queryFn: async () => await getAllPayments(page),
    placeholderData: keepPreviousData,
  });
};
