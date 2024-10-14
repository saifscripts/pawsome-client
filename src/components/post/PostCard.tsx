import { useAuth } from '@/contexts/auth.context';
import { useDownvotePost, useUpvotePost } from '@/hooks/post.hook';
import { cn } from '@/lib/cn';
import { IPost, IUser } from '@/types';
import { Avatar } from '@nextui-org/avatar';
import { Button } from '@nextui-org/button';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import CommentsModal from './CommentsModal';
import PostDropdown from './PostDropdown';

export default function PostCard({
  post,
  author,
}: {
  post: IPost;
  author: IUser;
}) {
  const [isFollowed, setIsFollowed] = React.useState(false);
  const { mutate: upvotePost } = useUpvotePost(post);
  const { mutate: downvotePost } = useDownvotePost(post);
  const { user } = useAuth();

  const isMyPost = user?._id === author?._id;

  return (
    <Card className="">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar isBordered radius="full" size="md" src={author?.avatarURL} />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {author?.name}
            </h4>
            <h5 className="text-small tracking-tight text-default-400">
              @{author.email.split('@')[0]}
            </h5>
          </div>
        </div>

        {isMyPost ? (
          <PostDropdown post={post} />
        ) : (
          <Button
            className={
              isFollowed
                ? 'bg-transparent text-foreground border-default-200'
                : ''
            }
            color="primary"
            radius="full"
            size="sm"
            variant={isFollowed ? 'bordered' : 'solid'}
            onPress={() => setIsFollowed(!isFollowed)}
          >
            {isFollowed ? 'Unfollow' : 'Follow'}
          </Button>
        )}
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400 grid grid-cols-[2fr_1fr] gap-4">
        <div>
          <h2 className="font-bold text-2xl text-default-600 mb-1">
            {post.title}
          </h2>
          <p>
            Frontend developer and UI/UX enthusiast. Join me on this coding
            adventure! Frontend developer and UI/UX enthusiast. Join me on this
            coding adventure! Frontend developer and UI/UX enthusiast. Join me
            on this coding adventure!
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
  );
}
