'use client';

import { useUserStatusModal } from '@/contexts/user-status.context';
import { useBlockUser, useUnblockUser } from '@/hooks/admin.hook';
import { Button } from '@nextui-org/button';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/modal';
import { useEffect } from 'react';

export default function UserStatusModal() {
  const { isOpen, onOpenChange, onClose, user, setUser } = useUserStatusModal();

  const handleClose = () => {
    setUser(null);
    onClose();
  };

  const {
    mutate: blockUser,
    isPending: isBlocking,
    isSuccess: isBlockSuccess,
    data: blockedUser,
  } = useBlockUser();

  const {
    mutate: unblockUser,
    isPending: isUnblocking,
    isSuccess: isUnblockSuccess,
    data: unblockedUser,
  } = useUnblockUser();

  useEffect(() => {
    if (!isBlocking && isBlockSuccess && blockedUser?.success) {
      handleClose();
    }
  }, [isBlocking, isBlockSuccess, blockedUser]);

  useEffect(() => {
    if (!isUnblocking && isUnblockSuccess && unblockedUser?.success) {
      handleClose();
    }
  }, [isUnblocking, isUnblockSuccess, unblockedUser]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          {user?.status === 'blocked' ? 'Unblock' : 'Block'} User?
        </ModalHeader>

        <ModalBody>
          <h2 className="font-bold text-2xl text-default-600">{user?.name}</h2>
        </ModalBody>

        <ModalFooter>
          <Button color="success" variant="light" onPress={handleClose}>
            Close
          </Button>
          {user?.status === 'blocked' ? (
            <Button
              color="danger"
              isLoading={isUnblocking}
              onPress={() => unblockUser(user?._id!)}
            >
              Unblock
            </Button>
          ) : (
            <Button
              color="success"
              isLoading={isBlocking}
              onPress={() => blockUser(user?._id!)}
            >
              Block
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
