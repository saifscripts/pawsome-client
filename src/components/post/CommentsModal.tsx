'use client';

import { useAuth } from '@/contexts/auth.context';
import { IPost, IUser } from '@/types';
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
import UserCard from '../user/UserCard';
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
            <UserCard user={author} className="rounded-2xl" />
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
