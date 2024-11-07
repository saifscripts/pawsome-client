import { useEditComment } from '@/hooks/comment.hook';
import { updateCommentSchema } from '@/schemas/comment.schema';
import { IComment } from '@/types';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import Form from '../form/Form';
import Input from '../form/Input';
import Submit from '../form/Submit';

export default function EditComment({
  comment,
  setMode,
}: {
  comment: IComment;
  setMode: Dispatch<SetStateAction<string>>;
}) {
  const {
    mutate: editComment,
    isPending,
    isSuccess,
    data: updatedComment,
  } = useEditComment();

  const defaultValues = {
    content: comment.content,
  };

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    editComment({ id: comment._id!, data });
  };

  useEffect(() => {
    if (!isPending && isSuccess && updatedComment?.success) {
      setMode('view');
    }
  }, [isPending, isSuccess, updatedComment]);

  return (
    <Form
      onSubmit={handleSubmit}
      defaultValues={defaultValues}
      formSchema={updateCommentSchema}
      className="flex gap-4"
    >
      <Input name="content" label="Comment" size="sm" />
      <Submit isLoading={isPending} className="w-auto" size="lg">
        Edit
      </Submit>
    </Form>
  );
}
