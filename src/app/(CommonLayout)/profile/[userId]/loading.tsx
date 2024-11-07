import {
  PostsSkeleton,
  ProfileHeaderSkeleton,
} from './_components/ProfileSkeleton';

export default function Loading() {
  return (
    <>
      <ProfileHeaderSkeleton />
      <PostsSkeleton />
    </>
  );
}
