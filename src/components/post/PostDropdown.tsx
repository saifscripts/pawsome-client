import { useDeletePost } from '@/hooks/post.hook';
import { IPost } from '@/types';
import { Button } from '@nextui-org/button';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/dropdown';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/modal';
import { EllipsisIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function PostDropdown({ post }: { post: IPost }) {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    mutate: deletePost,
    isPending,
    isSuccess,
    data: deletedPost,
  } = useDeletePost();

  useEffect(() => {
    if (!isPending && isSuccess && deletedPost?.success) {
      onClose();
    }
  }, [isPending, isSuccess, deletedPost]);

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Button variant="bordered" isIconOnly>
            <EllipsisIcon />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem
            onPress={() => router.push(`/edit-post/${post._id}`)}
            key="edit"
          >
            Edit
          </DropdownItem>
          <DropdownItem
            onPress={onOpen}
            key="delete"
            className="text-danger"
            color="danger"
          >
            Delete
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      {/* Delete Comment Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete Post?
              </ModalHeader>

              <ModalBody>
                <h2 className="font-bold text-2xl text-default-600">
                  {post.title}
                </h2>
              </ModalBody>

              <ModalFooter>
                <Button color="success" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="danger"
                  isLoading={isPending}
                  onPress={() => deletePost(post._id!)}
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
