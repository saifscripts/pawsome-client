'use client';

import { useUserRoleModal } from '@/contexts/user-role.context';
import { useMakeAdmin, useRemoveAdmin } from '@/hooks/admin.hook';
import { Button } from '@nextui-org/button';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/modal';
import { useEffect } from 'react';

export default function UserRoleModal() {
  const { isOpen, onOpenChange, onClose, user, setUser } = useUserRoleModal();

  const handleClose = () => {
    setUser(null);
    onClose();
  };

  const {
    mutate: makeAdmin,
    isPending: isMakingAdmin,
    isSuccess: isMakeAdminSuccess,
    data: madeAdmin,
  } = useMakeAdmin();

  const {
    mutate: removeAdmin,
    isPending: isRemovingAdmin,
    isSuccess: isRemoveAdminSuccess,
    data: removedAdmin,
  } = useRemoveAdmin();

  useEffect(() => {
    if (!isMakingAdmin && isMakeAdminSuccess && madeAdmin?.success) {
      handleClose();
    }
  }, [isMakingAdmin, isMakeAdminSuccess, madeAdmin]);

  useEffect(() => {
    if (!isRemovingAdmin && isRemoveAdminSuccess && removedAdmin?.success) {
      handleClose();
    }
  }, [isRemovingAdmin, isRemoveAdminSuccess, removedAdmin]);

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
          {user?.role === 'admin' ? (
            <Button
              color="danger"
              isLoading={isRemovingAdmin}
              onPress={() => removeAdmin(user?._id!)}
            >
              Remove Admin
            </Button>
          ) : (
            <Button
              color="success"
              isLoading={isMakingAdmin}
              onPress={() => makeAdmin(user?._id!)}
            >
              Make Admin
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
