'use client';

import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import { Skeleton } from '@nextui-org/skeleton';

export default function PostCardSkeleton() {
  return (
    <div>
      <Card className="cursor-pointer">
        <CardHeader className="flex justify-between items-center">
          {/* User info skeleton */}
          <div className="flex gap-3 items-center">
            <Skeleton className="flex rounded-full w-10 h-10" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-3 w-24 rounded-lg" />
              <Skeleton className="h-3 w-16 rounded-lg" />
            </div>
          </div>

          {/* Premium/Free chip skeleton */}
          <div className="flex gap-3 items-center">
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
        </CardHeader>

        <CardBody className="p-4 grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-4">
          <div>
            <Skeleton className="h-8 w-3/4 rounded-lg mb-2" />
            <Skeleton className="h-4 w-full rounded-lg mb-2" />
            <Skeleton className="h-4 w-2/3 rounded-lg" />
          </div>
          <div className="flex-1">
            <Skeleton className="rounded-lg w-full h-[160px]" />
          </div>
        </CardBody>

        <Divider />
        <CardFooter className="w-full block">
          {/* Engagements skeleton */}
          <div className="flex gap-6 items-center">
            <Skeleton className="h-4 w-16 rounded-lg" />
            <Skeleton className="h-4 w-16 rounded-lg" />
            <Skeleton className="h-4 w-16 rounded-lg" />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
