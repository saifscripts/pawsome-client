'use client';

import PublishPostModal from '@/components/post/PublishPostModal';
import { IPost } from '@/types';
import { useDisclosure } from '@nextui-org/modal';
import { createContext, ReactNode, useContext, useState } from 'react';

interface PublishPostModalContextProps {
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

const PublishPostModalContext = createContext<
  PublishPostModalContextProps | undefined
>(undefined);

const PublishPostModalProvider = ({ children }: { children: ReactNode }) => {
  const values = useDisclosure();
  const [post, setPost] = useState<IPost | null>(null);

  return (
    <PublishPostModalContext.Provider value={{ ...values, post, setPost }}>
      {children}
      {post && <PublishPostModal />}
    </PublishPostModalContext.Provider>
  );
};

export const usePublishPostModal = () => {
  const context = useContext(PublishPostModalContext);

  if (context === undefined) {
    throw new Error(
      'usePublishPostModal is used outside the PublishPostModalProvider'
    );
  }

  return context;
};

export default PublishPostModalProvider;
