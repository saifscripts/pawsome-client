'use client';

import { useUploadAvatar } from '@/hooks/profile.hook';
import { IUser } from '@/types';
import { Spinner } from '@nextui-org/spinner';
import { PencilIcon } from 'lucide-react';
import Image from 'next/image';
import { ChangeEventHandler } from 'react';

interface IProps {
  user: IUser;
}

export default function Header({ user }: IProps) {
  const { mutate: uploadAvatar, isPending } = useUploadAvatar();

  const handleUploadImage: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('avatar', file);
      uploadAvatar(formData);
    }
  };

  return (
    <header className="w-full h-56 bg-default-200 relative">
      <div className="size-[160px] ring-4 ring-default-100 rounded-full absolute left-4 -bottom-[80px]">
        <Image
          src={
            user?.avatarURL || 'https://i.pravatar.cc/150?u=a042581f4e29026024d'
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
    </header>
  );
}
