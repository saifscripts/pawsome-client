'use client';

import { useDeletePostModal } from '@/contexts/delete-post.context';
import { useDeletePost } from '@/hooks/post.hook';
import { Button } from '@nextui-org/button';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/modal';
import { useEffect } from 'react';

export default function DeletePostModal() {
  const { isOpen, onOpenChange, onClose, post, setPost } = useDeletePostModal();

  const {
    mutate: deletePost,
    isPending,
    isSuccess,
    data: deletedPost,
  } = useDeletePost();

  const handleClose = () => {
    onClose();
    setPost(null);
  };

  useEffect(() => {
    if (!isPending && isSuccess && deletedPost?.success) {
      handleClose();
    }
  }, [isPending, isSuccess, deletedPost]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Delete Post?
            </ModalHeader>

            <ModalBody>
              <h2 className="font-bold text-2xl text-default-600">
                {post?.title}
              </h2>
            </ModalBody>

            <ModalFooter>
              <Button color="success" variant="light" onPress={handleClose}>
                Close
              </Button>
              <Button
                color="danger"
                isLoading={isPending}
                onPress={() => deletePost(post?._id!)}
              >
                Delete
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
