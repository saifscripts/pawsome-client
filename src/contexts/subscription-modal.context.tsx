import SubscriptionModal from '@/components/subscription/SubscriptionModal';
import { useDisclosure } from '@nextui-org/modal';
import { createContext, ReactNode, useContext } from 'react';

interface ISubscriptionProviderValues {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onOpenChange: () => void;
  isControlled: boolean;
  getButtonProps: (props?: any) => any;
  getDisclosureProps: (props?: any) => any;
}

const SubscriptionModalContext = createContext<
  ISubscriptionProviderValues | undefined
>(undefined);

const SubscriptionModalProvider = ({ children }: { children: ReactNode }) => {
  const values = useDisclosure();

  return (
    <SubscriptionModalContext.Provider value={values}>
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
