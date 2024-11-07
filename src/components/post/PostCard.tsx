'use client';

import UserCard from '@/components/user/UserCard';
import { useAuth } from '@/contexts/auth.context';
import { useDownvotePost, useUpvotePost } from '@/hooks/post.hook';
import { cn } from '@/lib/cn';
import { IPost, IUser } from '@/types';
import { Button } from '@nextui-org/button';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Chip } from '@nextui-org/chip';
import { Divider } from '@nextui-org/divider';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CrownIcon,
  LinkIcon,
  SparklesIcon,
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
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
    <div onClick={() => route.push(`/posts/${post._id}`)} className="p-4">
      <Card className="cursor-pointer">
        <CardHeader className="flex justify-between items-center">
          <UserCard
            user={author}
            className="w-full sm:w-auto px-3 py-2 rounded-full"
          />

          <div className="flex gap-3 sm:gap-5 items-center mt-2 sm:mt-0">
            {post.isPremium ? (
              <Chip
                color="warning"
                variant="shadow"
                startContent={<CrownIcon size={16} />}
              >
                Premium
              </Chip>
            ) : (
              <Chip
                color="success"
                variant="flat"
                startContent={<SparklesIcon size={16} />}
              >
                Free
              </Chip>
            )}
            {isMyPost && <PostDropdown post={post} />}
          </div>
        </CardHeader>
        <CardBody className="p-4 text-small text-default-400 grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-4">
          <div>
            <h2 className="font-bold text-xl sm:text-2xl text-default-600 mb-1">
              {post.title}
            </h2>
            <p className="text-xs sm:text-sm">
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
        <Divider />
        <CardFooter className="flex gap-3 items-center justify-between">
          <div className="flex gap-3 items-center">
            <div className="flex gap-2 items-center rounded-xl bg-default-200 p-1">
              <Button
                isIconOnly
                className={cn(
                  'rounded-lg hover:text-success hover:bg-success/20',
                  {
                    'text-success': post.upvotes.includes(user!?._id),
                  }
                )}
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
                className={cn(
                  'rounded-lg hover:text-danger hover:bg-danger/20',
                  {
                    'text-danger': post.downvotes.includes(user!?._id),
                  }
                )}
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  downvotePost(post._id);
                }}
              >
                <ArrowDownIcon size={18} />
              </Button>
            </div>
            <CommentsModal post={post} author={author} />
          </div>
          <div className="flex gap-3 items-center">
            <Button
              isIconOnly
              color="primary"
              variant="light"
              onClick={(e) => {
                e.stopPropagation();
                navigator.clipboard.writeText(
                  `${window.location.origin}/posts/${post._id}`
                );
                toast.success('Link copied to clipboard');
              }}
            >
              <LinkIcon size={18} />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
