'use client';

import DeletePostModal from '@/components/post/DeletePostModal';
import { IPost } from '@/types';
import { useDisclosure } from '@nextui-org/modal';
import { createContext, ReactNode, useContext, useState } from 'react';

interface DeletePostModalContextProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onOpenChange: () => void;
  isControlled: boolean;
  getButtonProps: (props?: any) => any;
  getDisclosureProps: (props?: any) => any;
  post: IPost | null;
  setPost: (post: IPost | null) => void;
}

const DeletePostModalContext = createContext<
  DeletePostModalContextProps | undefined
>(undefined);

const DeletePostModalProvider = ({ children }: { children: ReactNode }) => {
  const values = useDisclosure();
  const [post, setPost] = useState<IPost | null>(null);

  return (
    <DeletePostModalContext.Provider value={{ ...values, post, setPost }}>
      {children}
      {post && <DeletePostModal />}
    </DeletePostModalContext.Provider>
  );
};

export const useDeletePostModal = () => {
  const context = useContext(DeletePostModalContext);

  if (context === undefined) {
    throw new Error(
      'useDeletePostModal is used outside the DeletePostModalProvider'
    );
  }

  return context;
};

export default DeletePostModalProvider;
