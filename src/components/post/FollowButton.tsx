import { useFollowUser, useMe, useUnfollowUser } from '@/hooks/user.hook';
import { Button } from '@nextui-org/button';

export default function FollowButton({ userId }: { userId: string }) {
  const { data: user } = useMe();
  const isFollowed = user?.data?.following.some((user) => user._id === userId);
  const isMyProfile = user?.data?._id === userId;

  const { mutate: followUser, isPending: isFollowing } = useFollowUser();
  const { mutate: unfollowUser, isPending: isUnfollowing } = useUnfollowUser();

  const handleFollow = () => {
    if (isFollowed) {
      unfollowUser(userId);
    } else {
      followUser(userId);
    }
  };

  if (isMyProfile) return null;

  return (
    <Button
      className={
        isFollowed ? 'bg-transparent text-foreground border-default-200' : ''
      }
      color="primary"
      radius="full"
      size="sm"
      variant={isFollowed ? 'bordered' : 'solid'}
      onPress={handleFollow}
      isLoading={isFollowing || isUnfollowing}
    >
      {isFollowed ? 'Unfollow' : 'Follow'}
    </Button>
  );
}
