import FollowButton from '@/components/post/FollowButton';
import { cn } from '@/lib/cn';
import { IUser } from '@/types';
import { User } from '@nextui-org/user';
import { useRouter } from 'next/navigation';

export default function UserCard({
  user,
  className,
}: {
  user: IUser;
  className?: string;
}) {
  const router = useRouter();

  return (
    <div
      key={user._id}
      onClick={(e) => {
        e.stopPropagation();
        router.push(`/profile/${user._id}`);
      }}
      className={cn(
        `flex items-center justify-between gap-4 w-full max-w-xl hover:bg-default-100 p-4 cursor-pointer`,
        className
      )}
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
