import { Button } from '@nextui-org/button';
import Link from 'next/link';

export default function LeftSidebar() {
  return (
    <aside className="w-[300px] min-h-[calc(100svh-72px)] border-r fixed top-[72px] left-0">
      <Link href="/create-post">
        <Button variant="bordered">Create Post</Button>
      </Link>
    </aside>
  );
}
