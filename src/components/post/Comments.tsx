import { useCreateComment } from '@/hooks/comment.hook';
import { createCommentSchema } from '@/schemas/comment.schema';
import { IPost, IUser } from '@/types';
import { Avatar } from '@nextui-org/avatar';
import { Button } from '@nextui-org/button';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/modal';
import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form';
import AppForm from '../form/AppForm';
import AppInput from '../form/AppInput';
import AppSubmit from '../form/AppSubmit';
import CommentCard from './CommentCard';

export default function Comments({
  post,
  author,
}: {
  post: IPost;
  author: IUser;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isFollowed, setIsFollowed] = useState(false);
  const [form, setForm] = useState<UseFormReturn | null>(null);

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
    <>
      <Button radius="full" size="sm" onPress={onOpen}>
        <p>{post?.comments?.length}</p>
        <p>Comments</p>
      </Button>
      <Modal
        size="xl"
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
      >
        <ModalContent>
          <ModalHeader className="block w-full pb-2">
            <div className="flex gap-2 justify-between pr-2">
              <div className="flex gap-5">
                <Avatar
                  isBordered
                  radius="full"
                  size="md"
                  src={author?.avatarURL}
                />
                <div className="flex flex-col gap-1 items-start justify-center">
                  <h4 className="text-small font-semibold leading-none text-default-600">
                    {author?.name}
                  </h4>
                  <h5 className="text-small tracking-tight text-default-400">
                    @{author.email.split('@')[0]}
                  </h5>
                </div>
              </div>
              <Button
                className={
                  isFollowed
                    ? 'bg-transparent text-foreground border-default-200'
                    : ''
                }
                color="primary"
                radius="full"
                size="sm"
                variant={isFollowed ? 'bordered' : 'solid'}
                onPress={() => setIsFollowed(!isFollowed)}
              >
                {isFollowed ? 'Unfollow' : 'Follow'}
              </Button>
            </div>
            <h2 className="font-bold text-2xl text-default-600 mt-2">
              {post.title}
            </h2>
          </ModalHeader>
          <ModalBody>
            {post?.comments?.map((comment) => (
              <CommentCard key={comment._id} comment={comment} />
            ))}
          </ModalBody>
          <ModalFooter className="block w-full">
            <AppForm
              onSubmit={handleSubmit}
              defaultValues={defaultValues}
              setForm={setForm}
              formSchema={createCommentSchema}
              className="flex gap-4"
            >
              <AppInput name="content" label="Comment" size="sm" />
              <AppSubmit isLoading={isPending} className="w-auto" size="lg">
                Add
              </AppSubmit>
            </AppForm>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
