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
import FadeInElement from '../ui/FadeInElement';
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
  const router = useRouter();

  const isMyPost = user?._id === author?._id;

  return (
    <FadeInElement>
      <div>
        <Card
          isHoverable
          isPressable
          className="cursor-pointer bg-default-50/50"
          onPress={() => router.push(`/posts/${post._id}`)}
        >
          <CardHeader className="flex flex-col xs:flex-row gap-4 justify-between items-center">
            <UserCard
              user={author}
              className="w-full sm:w-auto px-3 py-2 rounded-full"
            />

            <div className="flex gap-3 sm:gap-5 items-center">
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
            <div className="flex flex-col gap-4 justify-between">
              <div>
                <h2 className="font-bold text-xl sm:text-2xl text-default-600 mb-1">
                  {post.title}
                </h2>
                <p className="text-xs sm:text-sm">{post.summary}</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Chip variant="flat">#{post.category}</Chip>
                {post.tags?.map((tag) => (
                  <Chip variant="flat" key={tag}>
                    #{tag}
                  </Chip>
                ))}
              </div>
            </div>
            <div className="flex-1 w-full aspect-square rounded-lg overflow-hidden">
              <Image
                height={160}
                width={160}
                src={post?.featuredImage}
                alt={post.title}
                className="rounded-lg w-full h-full object-cover object-center"
              />
            </div>
          </CardBody>
          <Divider className="h-[0.5px] bg-divider/5" />
          <CardFooter className="w-full block">
            <Engagements post={post} />
          </CardFooter>
        </Card>
      </div>
    </FadeInElement>
  );
}
