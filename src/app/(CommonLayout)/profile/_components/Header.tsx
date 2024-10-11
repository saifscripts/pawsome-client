'use client';

import { useUploadAvatar, useUser } from '@/hooks/profile.hook';
import { Spinner } from '@nextui-org/spinner';
import { format } from 'date-fns';
import { PencilIcon } from 'lucide-react';
import Image from 'next/image';
import { ChangeEventHandler } from 'react';
import EditProfile from './EditProfile';



export default function Header() {
    const { data } = useUser();
    const { mutate: uploadAvatar, isPending } = useUploadAvatar();
    
    const handleUploadImage: ChangeEventHandler<HTMLInputElement> = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append('avatar', file);
            uploadAvatar(formData);
        }
    };
    
    const user = data?.data;
    if (!user) return null;

  return (
    <header>
      <div className="w-full h-56 bg-default-200 relative">
        <div className="size-[160px] ring-4 ring-default-100 rounded-full absolute left-4 -bottom-[80px]">
          <Image
            src={
              user?.avatarURL ||
              'https://i.pravatar.cc/150?u=a042581f4e29026024d'
            }
            alt="Logo"
            width={160}
            height={160}
            className="rounded-full h-full w-full object-cover"
          />
          <label
            htmlFor="avatar"
            className="absolute top-[3%] right-[3%] cursor-pointer bg-default-100 p-2 rounded-full"
          >
            <PencilIcon size={16} />
            <input
              onChange={handleUploadImage}
              type="file"
              id="avatar"
              className="hidden"
            />
          </label>
          {isPending && (
            <div className="absolute inset-0 flex justify-center items-center bg-black/50 rounded-full">
              <Spinner />
            </div>
          )}
        </div>
      </div>
      <div className="h-20 w-full p-4 flex justify-end">
        <EditProfile />
      </div>
      <div className="p-4">
        <h1 className="text-xl uppercase">{user?.name}</h1>
        <p>@{user?.email?.split('@')[0]}</p>
        <p>Joined at {format(user?.createdAt, 'PPP')}</p>
        <div className="flex gap-2 items-center">
          <p>{user?.following.length} Following</p>
          <p>{user?.followers.length} Followers</p>
        </div>
      </div>
    </header>
  );
}
