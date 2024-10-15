import { getPost } from '@/services/post-services';
import Image from 'next/image';
import Footer from './_components/Footer';
import Topbar from './_components/Topbar';

export default async function PostPage({
  params,
}: {
  params: { postId: string };
}) {
  const { postId } = params;
  const { data: post } = await getPost(postId);

  return (
    <>
      <Topbar />
      <div className="p-4">
        <div className="w-full aspect-video rounded-xl overflow-hidden">
          <Image
            src={post.featuredImage}
            alt={post.title}
            width={800}
            height={450}
            className="w-full h-full object-cover object-center"
          />
        </div>
        <h1 className="font-bold text-2xl my-4">{post.title}</h1>
        <div
          className="post"
          style={{ width: '100%' }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <Footer post={post} />
      </div>
    </>
  );
}
