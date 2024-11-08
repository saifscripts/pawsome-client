'use client';

import { useAuth } from '@/contexts/auth.context';
import { IPost, IUser } from '@/types';
import { Avatar } from '@nextui-org/avatar';
import { Button } from '@nextui-org/button';
import { Divider } from '@nextui-org/divider';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/modal';
import { MessageCircle } from 'lucide-react';
import { useState } from 'react';
import AddComment from './AddComment';
import Comments from './Comments';

export default function CommentsModal({
  post,
  author,
}: {
  post: IPost;
  author: IUser;
}) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [isFollowed, setIsFollowed] = useState(false);
  const { user } = useAuth();

  return (
    <>
      <Button
        className="bg-default-200"
        onClick={(e) => {
          e.stopPropagation();
          onOpen();
        }}
        startContent={<MessageCircle size={18} />}
      >
        <p>{post?.comments?.length}</p>
      </Button>
      <Modal
        size="xl"
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
        onOpenChange={onOpenChange}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalContent onClick={(e) => e.stopPropagation()}>
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
                    @{author?.email?.split?.('@')[0]}
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
          <Divider />
          <ModalBody>
            <Comments post={post} />
          </ModalBody>
          <ModalFooter className="block w-full">
            {user && <AddComment post={post} />}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
