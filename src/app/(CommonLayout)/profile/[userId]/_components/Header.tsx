'use client';

import FollowButton from '@/components/post/FollowButton';
import { useAuth } from '@/contexts/auth.context';
import { useUploadAvatar, useUser } from '@/hooks/user.hook';
import { Spinner } from '@nextui-org/spinner';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { PencilIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ChangeEventHandler } from 'react';
import EditProfile from './EditProfile';
import { ProfileHeaderSkeleton } from './ProfileSkeleton';

export default function Header() {
  const { mutate: uploadAvatar, isPending } = useUploadAvatar();
  const { user: authUser } = useAuth();
  const { data, isLoading } = useUser();
  const user = data?.data;

  if (isLoading) return <ProfileHeaderSkeleton />;

  const isMyProfile = authUser?._id === user?._id;

  const handleUploadImage: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('avatar', file);
      uploadAvatar(formData);
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className="w-full aspect-[4/1] bg-default-200 relative"
        style={{
          backgroundImage: `url("https://res.cloudinary.com/dz6h5okzp/image/upload/v1731016344/cover_leyc8e.png")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.05, duration: 0.15 }}
          className="size-[180px] ring-4 ring-default-50 rounded-full absolute left-8 -bottom-[90px]"
        >
          <Image
            src={
              user?.avatarURL ||
              'https://res.cloudinary.com/dz6h5okzp/image/upload/v1731015492/dp_ynqrvd.jpg'
            }
            alt="Logo"
            width={180}
            height={180}
            className="rounded-full h-full w-full object-cover"
          />
          <motion.label
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            htmlFor="avatar"
            className="absolute top-[3%] right-[3%] cursor-pointer bg-default-100 hover:bg-default-200 transition-colors p-2.5 rounded-full"
          >
            <PencilIcon size={18} className="text-default-700" />
            <input
              onChange={handleUploadImage}
              type="file"
              id="avatar"
              className="hidden"
            />
          </motion.label>
          {isPending && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex justify-center items-center bg-black/50 rounded-full"
            >
              <Spinner size="lg" />
            </motion.div>
          )}
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.15 }}
        className="h-24 w-full px-8 flex justify-end items-center"
      >
        {isMyProfile ? <EditProfile /> : <FollowButton userId={user?._id!} />}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.15 }}
        className="px-8 pb-6"
      >
        <h1 className="text-2xl font-bold text-default-900">{user?.name}</h1>
        <p className="text-default-500 text-sm mt-1">
          @{user?.email?.split('@')[0]}
        </p>
        {user?.createdAt && (
          <p className="text-default-500 text-sm mt-2">
            Joined {format(new Date(user?.createdAt), 'PPP')}
          </p>
        )}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.15 }}
          className="flex gap-4 items-center mt-4"
        >
          <Link
            href={`/profile/${user?._id}/following`}
            className="text-default-700 hover:underline"
          >
            <motion.span whileHover={{ scale: 1.05 }} className="font-semibold">
              {user?.following.length}
            </motion.span>{' '}
            <span className="text-default-500">Following</span>
          </Link>
          <Link
            href={`/profile/${user?._id}/followers`}
            className="text-default-700 hover:underline"
          >
            <motion.span whileHover={{ scale: 1.05 }} className="font-semibold">
              {user?.followers.length}
            </motion.span>{' '}
            <span className="text-default-500">Followers</span>
          </Link>
        </motion.div>
      </motion.div>
    </motion.header>
  );
}
