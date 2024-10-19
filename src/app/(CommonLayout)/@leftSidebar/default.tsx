import { Button } from '@nextui-org/button';
import Link from 'next/link';

export default function DefaultLeftSidebar() {
  return (
    <aside className="w-[300px] h-full border-r border-divider">
      <Link href="/create-post">
        <Button variant="bordered">Create Post</Button>
      </Link>
    </aside>
  );
}
