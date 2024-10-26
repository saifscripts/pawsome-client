import FollowButton from '@/components/post/FollowButton';
import { IUser } from '@/types';
import { User } from '@nextui-org/user';
import { useRouter } from 'next/navigation';

export default function UserCard({ user }: { user: IUser }) {
  const router = useRouter();

  return (
    <div
      key={user._id}
      onClick={() => router.push(`/profile/${user._id}`)}
      className="flex items-center justify-between w-full hover:bg-default-100 p-4 cursor-pointer"
    >
      <User
        isFocusable
        name={user.name}
        description={user.email.split('@')[0]}
        avatarProps={{
          src: user.avatarURL,
        }}
      />
      <FollowButton userId={user._id} />
    </div>
  );
}
