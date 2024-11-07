'use client';

import PostCard from '@/components/post/PostCard';
import { useUser } from '@/hooks/user.hook';
import { PostsSkeleton } from './_components/ProfileSkeleton';

export default function PostsPage() {
  const { data, isLoading } = useUser();
  const user = data?.data;

  if (isLoading) return <PostsSkeleton />;

  return (
    <div className="p-4 space-y-6 max-w-3xl mx-auto">
      {user?.posts && user?.posts?.length > 0 ? (
        user?.posts
          ?.sort((p1, p2) => {
            return (
              new Date(p2.createdAt).getTime() -
              new Date(p1.createdAt).getTime()
            );
          })
          ?.map((post) => <PostCard key={post._id} post={post} author={user} />)
      ) : (
        <p className="text-center text-default-500 py-4">No posts found</p>
      )}
    </div>
  );
}
