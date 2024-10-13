import { useEditComment } from '@/hooks/comment.hook';
import { updateCommentSchema } from '@/schemas/comment.schema';
import { IComment, IPost } from '@/types';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import AppForm from '../form/AppForm';
import AppInput from '../form/AppInput';
import AppSubmit from '../form/AppSubmit';

export default function EditComment({
  comment,
  post,
  setMode,
}: {
  comment: IComment;
  post: IPost;
  setMode: Dispatch<SetStateAction<string>>;
}) {
  const {
    mutate: editComment,
    isPending,
    isSuccess,
    data: updatedComment,
  } = useEditComment(post);

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
    <AppForm
      onSubmit={handleSubmit}
      defaultValues={defaultValues}
      formSchema={updateCommentSchema}
      className="flex gap-4"
    >
      <AppInput name="content" label="Comment" size="sm" />
      <AppSubmit isLoading={isPending} className="w-auto" size="lg">
        Edit
      </AppSubmit>
    </AppForm>
  );
}
