import { Button } from '@nextui-org/button';
import Link from 'next/link';

export default function DefaultLeftSidebar() {
  return (
    <aside className="w-full h-full border-r">
      <Link href="/create-post">
        <Button variant="bordered">Create Post</Button>
      </Link>
    </aside>
  );
}
