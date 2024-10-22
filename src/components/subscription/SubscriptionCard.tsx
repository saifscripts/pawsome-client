'use client';

import { useSubscriptionModal } from '@/contexts/subscription-modal.context';
import { useMe } from '@/hooks/profile.hook';
import { Button } from '@nextui-org/button';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { format } from 'date-fns';
import {
  CalendarArrowDownIcon,
  CalendarArrowUpIcon,
  CrownIcon,
  SquareArrowOutUpRightIcon,
} from 'lucide-react';

export default function SubscriptionCard() {
  const { onOpen } = useSubscriptionModal();
  const { data } = useMe();

  const user = data?.data;

  if (user?.userType === 'premium') {
    return (
      <Card className="bg-transparent border-divider border p-3">
        <CardHeader className="p-1 text-[20px] font-semibold">
          You’re Subscribed!
        </CardHeader>
        <CardBody className="p-1">
          <div className="flex gap-2 items-center text-[14px]">
            <CalendarArrowDownIcon size={16} />
            Starts: {format(user.subscription.startDate, 'PP')}
          </div>
          <div className="flex gap-2 items-center text-[14px]">
            <CalendarArrowUpIcon size={16} />
            Ends: {format(user.subscription.endDate, 'PP')}
          </div>
        </CardBody>
        <CardFooter className="p-1">
          <Button onPress={onOpen} size="sm" color="primary" variant="bordered">
            <SquareArrowOutUpRightIcon size={16} />
            Payment History
          </Button>
        </CardFooter>
      </Card>
    );
  }

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
