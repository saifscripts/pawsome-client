import PostCardSkeleton from '@/components/post/PostCardSkeleton';
import { Skeleton } from '@nextui-org/skeleton';

export function ProfileHeaderSkeleton() {
  return (
    <header>
      <div className="w-full h-64 bg-default-200 relative">
        <div className="size-[180px] ring-4 ring-default-50 rounded-full absolute left-8 -bottom-[90px]">
          <Skeleton className="size-full rounded-full" />
        </div>
      </div>
      <div className="h-24 w-full px-8 flex justify-end items-center">
        <Skeleton className="h-10 w-32 rounded-lg" />
      </div>
      <div className="px-8 pb-6">
        <Skeleton className="h-8 w-48 rounded-lg" />
        <Skeleton className="h-4 w-32 rounded-lg mt-1" />
        <Skeleton className="h-4 w-40 rounded-lg mt-2" />
        <div className="flex gap-4 items-center mt-4">
          <Skeleton className="h-6 w-24 rounded-lg" />
          <Skeleton className="h-6 w-24 rounded-lg" />
        </div>
      </div>
    </header>
  );
}

export function PostsSkeleton() {
  return (
    <div className="p-4 space-y-6 max-w-3xl mx-auto">
      <PostCardSkeleton />
      <PostCardSkeleton />
    </div>
  );
}

export function UserCardSkeleton() {
  return (
    <div className="p-4">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="w-full h-[80px] rounded-lg mb-4" />
      ))}
    </div>
  );
}
