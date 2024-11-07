'use client';

import UserCard from '@/components/user/UserCard';
import { useAuth } from '@/contexts/auth.context';
import { IPost, IUser } from '@/types';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Chip } from '@nextui-org/chip';
import { Divider } from '@nextui-org/divider';
import { CrownIcon, SparklesIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Engagements from './Engagements';
import PostDropdown from './PostDropdown';

export default function PostCard({
  post,
  author,
}: {
  post: IPost;
  author: IUser;
}) {
  const { user } = useAuth();
  const route = useRouter();

  const isMyPost = user?._id === author?._id;

  return (
    <div onClick={() => route.push(`/posts/${post._id}`)}>
      <Card className="cursor-pointer dark:hover:bg-default-100 hover:shadow-large hover:shadow-default-200">
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
            <p className="text-xs sm:text-sm">{post.summary}</p>
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
        <CardFooter className="w-full block">
          <Engagements post={post} />
        </CardFooter>
      </Card>
    </div>
  );
}
