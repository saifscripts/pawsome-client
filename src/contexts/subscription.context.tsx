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

const SubscriptionContext = createContext<
  ISubscriptionProviderValues | undefined
>(undefined);

const SubscriptionProvider = ({ children }: { children: ReactNode }) => {
  const values = useDisclosure();

  return (
    <SubscriptionContext.Provider value={values}>
      {children}
      <SubscriptionModal />
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);

  if (context === undefined) {
    throw new Error('useSubscription is used outside the SubscriptionProvider');
  }

  return context;
};

export default SubscriptionProvider;
