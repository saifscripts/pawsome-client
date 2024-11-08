import { useGetComments } from '@/hooks/comment.hook';
import { IPost } from '@/types';
import { useState } from 'react';
import CommentCard from './CommentCard';
import CommentSkeleton from './CommentSkeleton';

export default function Comments({ post }: { post: IPost }) {
  const [editCommentId, setEditCommentId] = useState<string | null>(null);
  const { comments, isLoading } = useGetComments(post._id);

  if (isLoading) return <CommentSkeleton />;

  return (
    <div className="space-y-4 mt-4">
      {comments && comments?.length > 0 ? (
        comments?.map((comment) => (
          <CommentCard
            key={comment._id}
            post={post}
            comment={comment}
            editCommentId={editCommentId}
            setEditCommentId={setEditCommentId}
          />
        ))
      ) : (
        <p className="text-center text-default-400">No comments yet</p>
      )}
    </div>
  );
}
