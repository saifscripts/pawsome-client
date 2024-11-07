'use client';

import CommentsModal from '@/components/post/CommentsModal';
import Votes from '@/components/post/Votes';
import { IPost } from '@/types';
import { Button } from '@nextui-org/button';
import { LinkIcon } from 'lucide-react';
import { toast } from 'sonner';

export default function Engagements({ post }: { post: IPost }) {
  return (
    <div className="flex gap-3 items-center justify-between">
      <div className="flex gap-3 items-center">
        <Votes post={post} />
        <CommentsModal post={post} author={post.author} />
      </div>
      <div className="flex gap-3 items-center">
        <Button
          isIconOnly
          color="primary"
          variant="light"
          onClick={(e) => {
            e.stopPropagation();
            navigator.clipboard.writeText(
              `${window.location.origin}/posts/${post._id}`
            );
            toast.success('Link copied to clipboard');
          }}
        >
          <LinkIcon size={18} />
        </Button>
      </div>
    </div>
  );
}
