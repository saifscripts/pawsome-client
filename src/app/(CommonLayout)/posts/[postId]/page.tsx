import { USER_TYPE } from '@/constants';
import { getAuthUser } from '@/services/auth.service';
import { getPost } from '@/services/post.service';
import { Divider } from '@nextui-org/divider';
import Image from 'next/image';
import Engagements from '../../../../components/post/Engagements';
import Topbar from './_components/Topbar';
import UpgradePremium from './_components/UpgradePremium';

export default async function PostPage({
  params,
}: {
  params: { postId: string };
}) {
  const { postId } = params;
  const { data: post } = await getPost(postId);
  const res = await getAuthUser();
  const user = res?.data;

  return (
    <>
      <Topbar author={post.author} />
      <div className="p-4 space-y-4 max-w-3xl mx-auto relative">
        <h1 className="font-bold text-5xl my-4">{post.title}</h1>
        <p className="text-sm text-default-500">{post.summary}</p>
        <Divider />
        <Engagements post={post} />
        <Divider />
        <div className="w-full aspect-video rounded-xl overflow-hidden">
          <Image
            src={post.featuredImage}
            alt={post.title}
            width={800}
            height={450}
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div
          className="post"
          style={{ width: '100%' }}
          dangerouslySetInnerHTML={{ __html: post?.content || '' }}
        />

        {user?.userType === USER_TYPE.BASIC && post.isPremium && (
          <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-white dark:from-black to-transparent" />
        )}
      </div>

      {user
        ? user?.userType === USER_TYPE.BASIC &&
          post.isPremium && <UpgradePremium />
        : post.isPremium && <UpgradePremium />}
    </>
  );
}
