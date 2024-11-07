'use client';

import { useAuth } from '@/contexts/auth.context';
import { useDownvotePost, useUpvotePost } from '@/hooks/post.hook';
import { cn } from '@/lib/cn';
import { IPost } from '@/types';
import { Button } from '@nextui-org/button';
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';

export default function Votes({ post }: { post: IPost }) {
  const { mutate: upvotePost } = useUpvotePost(post);
  const { mutate: downvotePost } = useDownvotePost(post);
  const { user } = useAuth();

  return (
    <div className="flex gap-2 items-center rounded-xl bg-default-200 p-1">
      <Button
        isIconOnly
        className={cn('rounded-lg hover:text-success hover:bg-success/20', {
          'text-success': post.upvotes.includes(user!?._id),
        })}
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          upvotePost(post._id);
        }}
      >
        <ArrowUpIcon size={18} />
      </Button>
      <span className="text-sm font-medium">
        {post.upvotes.length - post.downvotes.length}
      </span>
      <Button
        isIconOnly
        className={cn('rounded-lg hover:text-danger hover:bg-danger/20', {
          'text-danger': post.downvotes.includes(user!?._id),
        })}
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          downvotePost(post._id);
        }}
      >
        <ArrowDownIcon size={18} />
      </Button>
    </div>
  );
}
