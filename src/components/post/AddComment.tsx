'use client';

import { useCreateComment } from '@/hooks/comment.hook';
import { useMe } from '@/hooks/user.hook';
import { createCommentSchema } from '@/schemas/comment.schema';
import { IPost } from '@/types';
import { Avatar } from '@nextui-org/avatar';
import { SendHorizonalIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form';
import Form from '../form/Form';
import Input from '../form/Input';
import Submit from '../form/Submit';

export default function AddComment({ post }: { post: IPost }) {
  const [form, setForm] = useState<UseFormReturn | null>(null);
  const { user } = useMe();
  const {
    mutate: createComment,
    isPending,
    isSuccess,
    data: comment,
  } = useCreateComment(post);

  const defaultValues = {
    postId: post._id,
    content: '',
  };

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    data.postId = post._id;
    createComment(data);
  };

  useEffect(() => {
    if (!isPending && isSuccess && comment?.success) {
      form!.reset(defaultValues);
    }
  }, [isPending, isSuccess, comment]);

  return (
    <Form
      onSubmit={handleSubmit}
      defaultValues={defaultValues}
      setForm={setForm}
      formSchema={createCommentSchema}
      className="flex gap-4"
    >
      <Avatar src={user?.avatarURL} className="flex-shrink-0" />
      <Input name="content" placeholder="Add a comment" />
      <Submit isLoading={isPending} isIconOnly className="w-auto">
        <SendHorizonalIcon size={16} />
      </Submit>
    </Form>
  );
}
