import { title } from '@/components/primitives';
import { getCurrentUser } from '@/services/auth.service';
import { IUserRole } from '@/types';
import Link from 'next/link';
import sidebarGrid from '../_components/sidebarGrid';

export default async function DashboardPage() {
  const user = await getCurrentUser();

  return (
    <div className="flex flex-col items-center pt-10">
      <h1 className={title()}>Welcome to Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mt-10 w-full max-w-3xl px-4">
        {sidebarGrid[user?.role as IUserRole].flatMap((link) => (
          <Link
            key={link.path}
            href={link.path}
            className="flex flex-col items-center justify-center gap-3 p-6 rounded-lg border border-default-200 hover:bg-default-100 transition-colors aspect-square text-center"
          >
            <div className="p-3 rounded-full bg-default-100">{link.icon}</div>
            <span className="font-medium">{link.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
