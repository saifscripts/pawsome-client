import SubscriptionCard from '@/components/subscription/SubscriptionCard';
import Menu from './Menu';

export default function Sidebar() {
  return (
    <aside className="hidden lg:block w-[300px] h-full overflow-y-auto border-r border-divider p-4">
      <Menu />
      <SubscriptionCard />
    </aside>
  );
}
