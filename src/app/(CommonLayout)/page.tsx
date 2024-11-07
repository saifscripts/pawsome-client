import Feed from '../../components/home/Feed';
import RightSidebar from '../../components/home/RightSidebar';

export default function HomePage() {
  return (
    <div className="flex h-[calc(100svh-64px)]">
      <Feed />
      <RightSidebar />
    </div>
  );
}
