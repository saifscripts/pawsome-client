import SubscriptionCard from '@/components/subscription/SubscriptionCard';

export default function DefaultLeftSidebar() {
  return (
    <aside className="w-[300px] h-full overflow-y-auto border-r border-divider p-4">
      <SubscriptionCard />
    </aside>
  );
}
