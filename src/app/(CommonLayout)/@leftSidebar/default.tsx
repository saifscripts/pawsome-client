import SubscriptionCard from '@/components/subscription/SubscriptionCard';
import { Divider } from '@nextui-org/divider';
import SidebarMenu from './_components/SidebarMenu';

export default function DefaultLeftSidebar() {
  return (
    <aside className="w-[300px] h-full overflow-y-auto border-r border-divider p-4">
      <SidebarMenu />
      <Divider className="my-4" />
      <SubscriptionCard />
    </aside>
  );
}
