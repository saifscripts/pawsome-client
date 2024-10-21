'use client';

import { useSubscription } from '@/contexts/subscription.context';
import { Button } from '@nextui-org/button';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { CrownIcon } from 'lucide-react';

export default function SubscriptionCard() {
  const { onOpen } = useSubscription();
  return (
    <Card className="bg-transparent border-divider border p-3">
      <CardHeader className="p-1 text-[20px] font-semibold">
        Upgrade to Premium
      </CardHeader>
      <CardBody className="p-1">
        <p className="text-[14px]">
          Get access to expert pet care tips and special content just for
          premium members.
        </p>
      </CardBody>
      <CardFooter className="p-1">
        <Button onPress={onOpen} size="sm" color="primary">
          <CrownIcon size={16} />
          Go Premium
        </Button>
      </CardFooter>
    </Card>
  );
}
