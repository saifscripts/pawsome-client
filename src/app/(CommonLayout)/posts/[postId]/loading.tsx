import { Divider } from '@nextui-org/divider';
import { Skeleton } from '@nextui-org/skeleton';

export default function PostPageSkeleton() {
  return (
    <>
      {/* Topbar skeleton */}
      <div className="border-b border-divider">
        <div className="max-w-3xl mx-auto p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32 rounded-lg" />
              <Skeleton className="h-3 w-24 rounded-lg" />
            </div>
          </div>
          <Skeleton className="h-9 w-24 rounded-full" />
        </div>
      </div>

      <div className="p-4 space-y-4 max-w-3xl mx-auto relative">
        {/* Title and summary */}
        <Skeleton className="h-12 w-3/4 rounded-lg my-4" />
        <Skeleton className="h-4 w-full rounded-lg" />

        <Divider />

        {/* Engagements skeleton */}
        <div className="flex gap-6 items-center">
          <Skeleton className="h-4 w-20 rounded-lg" />
          <Skeleton className="h-4 w-20 rounded-lg" />
          <Skeleton className="h-4 w-20 rounded-lg" />
        </div>

        <Divider />

        {/* Featured image skeleton */}
        <div className="w-full aspect-video rounded-xl overflow-hidden">
          <Skeleton className="w-full h-full" />
        </div>

        {/* Content skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-4 w-full rounded-lg" />
          <Skeleton className="h-4 w-5/6 rounded-lg" />
          <Skeleton className="h-4 w-4/6 rounded-lg" />
          <Skeleton className="h-4 w-full rounded-lg" />
          <Skeleton className="h-4 w-3/4 rounded-lg" />
        </div>
      </div>
    </>
  );
}
