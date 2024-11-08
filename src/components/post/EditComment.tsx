import { useEditComment } from '@/hooks/comment.hook';
import { updateCommentSchema } from '@/schemas/comment.schema';
import { IComment } from '@/types';
import { Avatar } from '@nextui-org/avatar';
import { SendHorizonalIcon } from 'lucide-react';
import { useEffect } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import Form from '../form/Form';
import Input from '../form/Input';
import Submit from '../form/Submit';

export default function EditComment({
  comment,
  setEditCommentId,
}: {
  comment: IComment;
  setEditCommentId: (id: string | null) => void;
}) {
  const {
    mutate: editComment,
    isPending,
    isSuccess,
    data: updatedComment,
  } = useEditComment(comment.postId);

  const defaultValues = {
    content: comment.content,
  };

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    editComment({ id: comment._id!, data });
  };

  useEffect(() => {
    if (!isPending && isSuccess && updatedComment?.success) {
      setEditCommentId(null);
    }
  }, [isPending, isSuccess, updatedComment]);

  return (
    <div className="flex gap-5">
      <Avatar
        isBordered
        radius="full"
        size="sm"
        src={comment?.author?.avatarURL}
      />
      <div className="flex flex-col gap-1 items-start justify-center flex-1">
        <h4 className="text-small font-semibold leading-none text-default-600">
          {comment?.author?.name}
        </h4>
        <Form
          onSubmit={handleSubmit}
          defaultValues={defaultValues}
          formSchema={updateCommentSchema}
          className="flex gap-4 w-full"
        >
          <Input name="content" className="flex-1" />
          <Submit isIconOnly isLoading={isPending} className="w-auto">
            <SendHorizonalIcon size={16} />
          </Submit>
        </Form>
      </div>
    </div>
  );
}
