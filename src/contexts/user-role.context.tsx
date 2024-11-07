'use client';

import UserRoleModal from '@/components/user/UserRoleModal';
import { IUser } from '@/types';
import { useDisclosure } from '@nextui-org/modal';
import { createContext, ReactNode, useContext, useState } from 'react';

interface UserRoleModalContextProps {
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

const UserRoleModalContext = createContext<
  UserRoleModalContextProps | undefined
>(undefined);

const UserRoleModalProvider = ({ children }: { children: ReactNode }) => {
  const values = useDisclosure();
  const [user, setUser] = useState<IUser | null>(null);

  return (
    <UserRoleModalContext.Provider value={{ ...values, user, setUser }}>
      {children}
      {user && <UserRoleModal />}
    </UserRoleModalContext.Provider>
  );
};

export const useUserRoleModal = () => {
  const context = useContext(UserRoleModalContext);

  if (context === undefined) {
    throw new Error(
      'useUserRoleModal is used outside the UserRoleModalProvider'
    );
  }

  return context;
};

export default UserRoleModalProvider;
