'use client';

import { useDeleteUserModal } from '@/contexts/delete-user.context';
import { useDeleteUser } from '@/hooks/admin.hook';
import { Button } from '@nextui-org/button';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/modal';
import { useEffect } from 'react';

export default function DeleteUserModal() {
  const { isOpen, onOpenChange, onClose, user, setUser } = useDeleteUserModal();

  const {
    mutate: deleteUser,
    isPending,
    isSuccess,
    data: deletedUser,
  } = useDeleteUser();

  const handleClose = () => {
    onClose();
    setUser(null);
  };

  useEffect(() => {
    if (!isPending && isSuccess && deletedUser?.success) {
      handleClose();
    }
  }, [isPending, isSuccess, deletedUser]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Delete User?
            </ModalHeader>

            <ModalBody>
              <h2 className="font-bold text-2xl text-default-600">
                {user?.name}
              </h2>
            </ModalBody>

            <ModalFooter>
              <Button color="success" variant="light" onPress={handleClose}>
                Close
              </Button>
              <Button
                color="danger"
                isLoading={isPending}
                onPress={() => deleteUser(user?._id!)}
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
