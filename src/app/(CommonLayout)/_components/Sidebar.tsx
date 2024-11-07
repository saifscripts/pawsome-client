import SubscriptionCard from '@/components/subscription/SubscriptionCard';
import { Divider } from '@nextui-org/divider';
import Menu from './Menu';

export default function Sidebar() {
  return (
    <aside className="w-[300px] h-full overflow-y-auto border-r border-divider p-4">
      <Menu />
      <Divider className="my-4" />
      <SubscriptionCard />
    </aside>
  );
}
