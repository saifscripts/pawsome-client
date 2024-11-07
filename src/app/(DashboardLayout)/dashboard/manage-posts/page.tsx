import PublishPostModalProvider from '@/contexts/publish-post.context';
import AllPosts from './_components/AllPosts';

export default function MyPosts() {
  return (
    <div className="p-4">
      <PublishPostModalProvider>
        <AllPosts />
      </PublishPostModalProvider>
    </div>
  );
}
