'use client';

import CommentsModal from '@/components/post/CommentsModal';
import { useAuth } from '@/contexts/auth.context';
import { useDownvotePost, useUpvotePost } from '@/hooks/post.hook';
import { cn } from '@/lib/cn';
import { IPost } from '@/types';
import { Button } from '@nextui-org/button';
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';

export default function Footer({ post }: { post: IPost }) {
  const { mutate: upvotePost } = useUpvotePost(post);
  const { mutate: downvotePost } = useDownvotePost(post);
  const { user } = useAuth();

  console.log(post.author);

  return (
    <div className="flex gap-2 items-center">
      <div className="flex gap-2 items-center rounded-full bg-default-300 dark:bg-default-200">
        <Button
          isIconOnly
          className={cn('rounded-full hover:brightness-75', {
            'text-primary-500': post.upvotes.includes(user!?._id),
          })}
          size="sm"
          onClick={() => upvotePost(post._id)}
        >
          <ArrowUpIcon size={16} />
        </Button>
        {post.upvotes.length - post.downvotes.length}
        <Button
          isIconOnly
          className={cn('rounded-full hover:brightness-75', {
            'text-primary-500': post.downvotes.includes(user!?._id),
          })}
          size="sm"
          onClick={() => downvotePost(post._id)}
        >
          <ArrowDownIcon size={16} />
        </Button>
      </div>
      <CommentsModal post={post} author={post.author} />
    </div>
  );
}
