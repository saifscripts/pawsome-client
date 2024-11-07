'use client';

import DeleteUserModal from '@/components/user/DeleteUserModal';
import { IUser } from '@/types';
import { useDisclosure } from '@nextui-org/modal';
import { createContext, ReactNode, useContext, useState } from 'react';

interface DeleteUserModalContextProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onOpenChange: () => void;
  isControlled: boolean;
  getButtonProps: (props?: any) => any;
  getDisclosureProps: (props?: any) => any;
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}

const DeleteUserModalContext = createContext<
  DeleteUserModalContextProps | undefined
>(undefined);

const DeleteUserModalProvider = ({ children }: { children: ReactNode }) => {
  const values = useDisclosure();
  const [user, setUser] = useState<IUser | null>(null);

  return (
    <DeleteUserModalContext.Provider value={{ ...values, user, setUser }}>
      {children}
      {user && <DeleteUserModal />}
    </DeleteUserModalContext.Provider>
  );
};

export const useDeleteUserModal = () => {
  const context = useContext(DeleteUserModalContext);

  if (context === undefined) {
    throw new Error(
      'useDeleteUserModal is used outside the DeleteUserModalProvider'
    );
  }

  return context;
};

export default DeleteUserModalProvider;
