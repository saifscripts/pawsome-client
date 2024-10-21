import { useSubscription } from '@/contexts/subscription.context';
import { useInitiatePayment } from '@/hooks/subscription.hook';
import { BDT } from '@/utils/format';
import { Button } from '@nextui-org/button';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Modal, ModalBody, ModalContent } from '@nextui-org/modal';
import { CheckIcon, CrownIcon, SquareCheckBigIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function SubscriptionModal() {
  const { isOpen, onClose, onOpenChange } = useSubscription();
  const { mutate: initiatePayment, isPending } = useInitiatePayment();
  const [subscriptionType, setSubscriptionType] = useState('');

  const handleSubscription = (subscriptionType: 'monthly' | 'yearly') => {
    setSubscriptionType(subscriptionType);
    initiatePayment({ subscriptionType });
  };

  return (
    <Modal
      size="full"
      scrollBehavior="inside"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent className="bg-white dark:bg-black">
        <ModalBody>
          <div className="flex flex-col gap-2 text-center my-8">
            <h1 className="text-4xl font-bold ">Upgrade to Premium</h1>
            <p className="text-lg">
              Find the right plan for you and your pets.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl mx-auto">
            {/* Free Plan */}
            <Card className="p-2  ">
              <CardHeader className="block space-y-2">
                <h2 className="text-lg">Free Plan</h2>
                <p className="text-3xl font-semibold">Free Forever</p>
                <p>Access basic pet care tips and community features.</p>
              </CardHeader>
              <CardBody>
                <ul className="text-left space-y-2">
                  <li className="flex gap-2 items-center">
                    <CheckIcon size={16} /> Free content access
                  </li>
                  <li className="flex gap-2 items-center">
                    <CheckIcon size={16} /> Join discussions
                  </li>
                  <li className="flex gap-2 items-center">
                    <CheckIcon size={16} /> Basic care guides
                  </li>
                </ul>
              </CardBody>
              <CardFooter>
                <Button disabled variant="flat">
                  <SquareCheckBigIcon size={20} />
                  Already Subscribed
                </Button>
              </CardFooter>
            </Card>

            {/* Monthly Plan */}
            <Card className="p-2  ">
              <CardHeader className="block space-y-2">
                <h2 className="text-lg">Monthly Plan</h2>
                <p className="text-3xl font-semibold">
                  {BDT(99)}
                  <span className="text-lg">/month</span>
                </p>
                <p>Upgrade for advanced pet care tips every month.</p>
              </CardHeader>
              <CardBody>
                <ul className="text-left space-y-2">
                  <li className="flex gap-2 items-center">
                    <CheckIcon size={16} /> All Free Plan features
                  </li>
                  <li className="flex gap-2 items-center">
                    <CheckIcon size={16} /> Exclusive premium content
                  </li>
                  <li className="flex gap-2 items-center">
                    <CheckIcon size={16} /> Personalized tips
                  </li>
                  <li className="flex gap-2 items-center">
                    <CheckIcon size={16} /> Expert advice
                  </li>
                </ul>
              </CardBody>
              <CardFooter>
                <Button
                  color="primary"
                  variant="shadow"
                  disabled={subscriptionType !== 'monthly' && isPending}
                  isLoading={subscriptionType === 'monthly' && isPending}
                  onClick={() => handleSubscription('monthly')}
                >
                  <CrownIcon size={20} />
                  Upgrade to Monthly
                </Button>
              </CardFooter>
            </Card>

            {/* Yearly Plan */}
            <Card className="p-2  ">
              <CardHeader className="block space-y-2">
                <h2 className="text-lg">Yearly Plan</h2>
                <p className="text-3xl font-semibold">
                  {BDT(949)}
                  <span className="text-lg">/year</span>
                </p>
                <p>Save more with our annual plan.</p>
              </CardHeader>
              <CardBody>
                <ul className="text-left space-y-2">
                  <li className="flex gap-2 items-center">
                    <CheckIcon size={16} /> All Monthly Plan features
                  </li>
                  <li className="flex gap-2 items-center">
                    <CheckIcon size={16} /> Save 20% on annual pricing
                  </li>
                  <li className="flex gap-2 items-center">
                    <CheckIcon size={16} /> Priority support
                  </li>
                  <li className="flex gap-2 items-center">
                    <CheckIcon size={16} /> Early feature access
                  </li>
                </ul>
              </CardBody>
              <CardFooter>
                <Button
                  color="success"
                  variant="shadow"
                  disabled={subscriptionType !== 'yearly' && isPending}
                  isLoading={subscriptionType === 'yearly' && isPending}
                  onClick={() => handleSubscription('yearly')}
                >
                  <CrownIcon size={20} />
                  Upgrade to Yearly
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Footer */}
          <div className="my-8 text-center">
            <p>
              Need help choosing the right plan?{' '}
              <Link
                href="/about"
                onClick={onClose}
                className="text-primary-500 hover:underline"
              >
                Contact support
              </Link>
            </p>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
