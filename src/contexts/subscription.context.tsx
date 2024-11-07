import SubscriptionModal from '@/components/subscription/SubscriptionModal';
import { useDisclosure } from '@nextui-org/modal';
import { usePathname, useRouter } from 'next/navigation';
import { createContext, ReactNode, useCallback, useContext } from 'react';
import { useAuth } from './auth.context';

interface SubscriptionModalContextProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onOpenChange: () => void;
  isControlled: boolean;
  getButtonProps: (props?: any) => any;
  getDisclosureProps: (props?: any) => any;
}

const SubscriptionModalContext = createContext<
  SubscriptionModalContextProps | undefined
>(undefined);

const SubscriptionModalProvider = ({ children }: { children: ReactNode }) => {
  const values = useDisclosure();
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const onOpen = useCallback(() => {
    if (!user) {
      router.push(`/login?redirect=${pathname}`);
    } else {
      values.onOpen();
    }
  }, [user]);

  return (
    <SubscriptionModalContext.Provider value={{ ...values, onOpen }}>
      {children}
      <SubscriptionModal />
    </SubscriptionModalContext.Provider>
  );
};

export const useSubscriptionModal = () => {
  const context = useContext(SubscriptionModalContext);

  if (context === undefined) {
    throw new Error('useSubscription is used outside the SubscriptionProvider');
  }

  return context;
};

export default SubscriptionModalProvider;
