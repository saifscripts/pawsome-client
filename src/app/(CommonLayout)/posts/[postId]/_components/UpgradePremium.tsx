'use client';
import { useSubscriptionModal } from '@/contexts/subscription-modal.context';
import { Button } from '@nextui-org/button';
import { CrownIcon } from 'lucide-react';

export default function UpgradePremium() {
  const { onOpen } = useSubscriptionModal();
  return (
    <div className="flex flex-col items-center justify-center px-4 pb-4 gap-4">
      <p className="text-sm text-default-500">
        Upgrade to premium to access to expert pet care tips and special
        content.
      </p>
      <Button onPress={onOpen} size="sm" color="primary">
        <CrownIcon size={16} />
        Upgrade Premium
      </Button>
    </div>
  );
}
