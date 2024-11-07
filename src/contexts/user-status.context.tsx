'use client';

import UserStatusModal from '@/components/user/UserStatusModal';
import { IUser } from '@/types';
import { useDisclosure } from '@nextui-org/modal';
import { createContext, ReactNode, useContext, useState } from 'react';

interface UserStatusModalContextProps {
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

const UserStatusModalContext = createContext<
  UserStatusModalContextProps | undefined
>(undefined);

const UserStatusModalProvider = ({ children }: { children: ReactNode }) => {
  const values = useDisclosure();
  const [user, setUser] = useState<IUser | null>(null);

  return (
    <UserStatusModalContext.Provider value={{ ...values, user, setUser }}>
      {children}
      {user && <UserStatusModal />}
    </UserStatusModalContext.Provider>
  );
};

export const useUserStatusModal = () => {
  const context = useContext(UserStatusModalContext);

  if (context === undefined) {
    throw new Error(
      'useUserStatusModal is used outside the UserStatusModalProvider'
    );
  }

  return context;
};

export default UserStatusModalProvider;
