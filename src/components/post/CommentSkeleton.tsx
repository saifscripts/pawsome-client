import { Divider } from '@nextui-org/divider';
import { Skeleton } from '@nextui-org/skeleton';

export default function CommentSkeleton() {
  return (
    <>
      <div className="flex gap-5">
        <Skeleton className="rounded-full w-8 h-8" />
        <div className="flex gap-5 justify-between flex-1">
          <div className="flex flex-col gap-1 items-start justify-center w-full">
            <Skeleton className="h-3 w-24 rounded-lg" />
            <Skeleton className="h-3 w-3/4 rounded-lg" />
          </div>
        </div>
      </div>
      <Divider className="my-2" />
    </>
  );
}
