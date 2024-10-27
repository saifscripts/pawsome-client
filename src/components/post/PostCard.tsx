'use client';

import UserCard from '@/components/user/UserCard';
import { useAuth } from '@/contexts/auth.context';
import { useDownvotePost, useUpvotePost } from '@/hooks/post.hook';
import { cn } from '@/lib/cn';
import { IPost, IUser } from '@/types';
import { Button } from '@nextui-org/button';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Chip } from '@nextui-org/chip';
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import CommentsModal from './CommentsModal';
import PostDropdown from './PostDropdown';

export default function PostCard({
  post,
  author,
}: {
  post: IPost;
  author: IUser;
}) {
  const { mutate: upvotePost } = useUpvotePost(post);
  const { mutate: downvotePost } = useDownvotePost(post);
  const { user } = useAuth();
  const route = useRouter();

  const isMyPost = user?._id === author?._id;

  return (
    <div onClick={() => route.push(`/posts/${post._id}`)}>
      <Card className="cursor-pointer">
        <CardHeader className="justify-between">
          <UserCard user={author} className="w-auto px-3 py-2 rounded-full" />

          <div className="flex gap-5 items-center">
            {post.isPremium ? (
              <Chip color="success">Premium</Chip>
            ) : (
              <Chip color="secondary">Free</Chip>
            )}
            {isMyPost && <PostDropdown post={post} />}
          </div>
        </CardHeader>
        <CardBody className="px-3 py-0 text-small text-default-400 grid grid-cols-[2fr_1fr] gap-4">
          <div>
            <h2 className="font-bold text-2xl text-default-600 mb-1">
              {post.title}
            </h2>
            <p>
              Frontend developer and UI/UX enthusiast. Join me on this coding
              adventure! Frontend developer and UI/UX enthusiast. Join me on
              this coding adventure! Frontend developer and UI/UX enthusiast.
              Join me on this coding adventure!
            </p>
          </div>
          <picture className="flex-1">
            <Image
              height={160}
              width={160}
              src={post?.featuredImage}
              alt={post.title}
              className="rounded-lg w-full object-cover"
            />
          </picture>
        </CardBody>
        <CardFooter className="gap-3">
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
          <CommentsModal post={post} author={author} />
        </CardFooter>
      </Card>
    </div>
  );
}
