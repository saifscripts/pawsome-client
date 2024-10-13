import { IComment } from '@/types';
import { Avatar } from '@nextui-org/avatar';
import { Divider } from '@nextui-org/divider';

export default function CommentCard({ comment }: { comment: IComment }) {
  return (
    <>
      <div className="flex gap-5">
        <Avatar
          isBordered
          radius="full"
          size="sm"
          src={comment?.author?.avatarURL}
        />
        <div className="flex flex-col gap-1 items-start justify-center">
          <h4 className="text-small font-semibold leading-none text-default-600">
            {comment?.author?.name}
          </h4>
          <p className="text-small tracking-tight text-default-400">
            {comment.content}
          </p>
        </div>
      </div>
      <Divider className="my-2" />
    </>
  );
}
