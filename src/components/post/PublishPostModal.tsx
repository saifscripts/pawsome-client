'use client';

import { usePublishPostModal } from '@/contexts/publish-post.context';
import { usePublishPost, useUnpublishPost } from '@/hooks/admin.hook';
import { Button } from '@nextui-org/button';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/modal';
import { useEffect } from 'react';

export default function PublishPostModal() {
  const { isOpen, onOpenChange, onClose, post, setPost } =
    usePublishPostModal();

  const handleClose = () => {
    setPost(null);
    onClose();
  };

  const {
    mutate: publishPost,
    isPending: isPublishing,
    isSuccess: isPublishSuccess,
    data: publishedPost,
  } = usePublishPost();

  const {
    mutate: unpublishPost,
    isPending: isUnpublishing,
    isSuccess: isUnpublishSuccess,
    data: unpublishedPost,
  } = useUnpublishPost();

  useEffect(() => {
    if (!isPublishing && isPublishSuccess && publishedPost?.success) {
      handleClose();
    }
  }, [isPublishing, isPublishSuccess, publishedPost]);

  useEffect(() => {
    if (!isUnpublishing && isUnpublishSuccess && unpublishedPost?.success) {
      handleClose();
    }
  }, [isUnpublishing, isUnpublishSuccess, unpublishedPost]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          {post?.isPublished ? 'Unpublish' : 'Publish'} Post?
        </ModalHeader>

        <ModalBody>
          <h2 className="font-bold text-2xl text-default-600">{post?.title}</h2>
        </ModalBody>

        <ModalFooter>
          <Button color="success" variant="light" onPress={handleClose}>
            Close
          </Button>
          {post?.isPublished ? (
            <Button
              color="danger"
              isLoading={isUnpublishing}
              onPress={() => unpublishPost(post?._id!)}
            >
              Unpublish
            </Button>
          ) : (
            <Button
              color="success"
              isLoading={isPublishing}
              onPress={() => publishPost(post?._id!)}
            >
              Publish
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
