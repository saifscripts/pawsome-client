import { useFollowUser, useMe, useUnfollowUser } from '@/hooks/profile.hook';
import { Button } from '@nextui-org/button';

export default function FollowButton({ userId }: { userId: string }) {
  const { data: user } = useMe();
  const isFollowed = user?.data?.following.includes(userId);

  const { mutate: followUser, isPending: isFollowing } = useFollowUser();
  const { mutate: unfollowUser, isPending: isUnfollowing } = useUnfollowUser();

  const handleFollow = () => {
    if (isFollowed) {
      unfollowUser(userId);
    } else {
      followUser(userId);
    }
  };

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
