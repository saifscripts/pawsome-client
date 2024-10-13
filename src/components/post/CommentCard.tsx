import { useDeleteComment } from '@/hooks/comment.hook';
import { IComment, IPost } from '@/types';
import { Avatar } from '@nextui-org/avatar';
import { Button } from '@nextui-org/button';
import { Divider } from '@nextui-org/divider';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/dropdown';
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/modal';
import { EllipsisIcon } from 'lucide-react';
import { useEffect } from 'react';

export default function CommentCard({
  comment,
  post,
}: {
  comment: IComment;
  post: IPost;
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    mutate: deleteComment,
    isPending,
    isSuccess,
    data: deletedComment,
  } = useDeleteComment(post);

  useEffect(() => {
    if (!isPending && isSuccess && deletedComment?.success) {
      onClose();
    }
  }, [isPending, isSuccess, deletedComment]);

  return (
    <>
      <div className="flex gap-5">
        <Avatar
          isBordered
          radius="full"
          size="sm"
          src={comment?.author?.avatarURL}
        />
        <div className="flex gap-5 justify-between flex-1">
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {comment?.author?.name}
            </h4>
            <p className="text-small tracking-tight text-default-400">
              {comment.content}
            </p>
          </div>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered" isIconOnly>
                <EllipsisIcon />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="edit">Edit Comment</DropdownItem>
              <DropdownItem
                onPress={onOpen}
                key="delete"
                className="text-danger"
                color="danger"
              >
                Delete Comment
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <Divider className="my-2" />
      {/* Delete Comment Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete Comment?
              </ModalHeader>

              <ModalFooter>
                <Button color="success" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="danger"
                  isLoading={isPending}
                  onPress={() => deleteComment(comment._id!)}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
