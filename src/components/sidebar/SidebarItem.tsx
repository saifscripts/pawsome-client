'use client';

import { Button } from '@nextui-org/button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export default function SidebarItem({
  title,
  icon,
  path,
  activeParams,
  antiActiveParams,
}: {
  title: string;
  icon: React.ReactNode;
  path: string;
  activeParams?: { key: string; value: string }[];
  antiActiveParams?: { key: string; value: string }[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPath = usePathname();

  /*
   * Item is active if the path matches and the params match the conditions:
   * If there is activeParams and antiActiveParams, then the item is active if all activeParams are present and none of the antiActiveParams are present.
   * If there is only activeParams, then the item is active if all activeParams are present.
   * If there is only antiActiveParams, then the item is active if none of the antiActiveParams are present.
   * If there is neither activeParams nor antiActiveParams, then the item is active if the path matches.
   */
  const isActive = useMemo(() => {
    const isPathMatch = currentPath === path;

    let isParamsMatch = true;

    if (activeParams && antiActiveParams) {
      isParamsMatch =
        activeParams?.every(
          (param) => searchParams.get(param.key) === param.value
        ) &&
        !antiActiveParams?.some(
          (param) => searchParams.get(param.key) === param.value
        );
    } else if (activeParams && !antiActiveParams) {
      isParamsMatch = activeParams?.every(
        (param) => searchParams.get(param.key) === param.value
      );
    } else if (!activeParams && antiActiveParams) {
      isParamsMatch = !antiActiveParams?.some(
        (param) => searchParams.get(param.key) === param.value
      );
    }

    return isPathMatch && isParamsMatch;
  }, [activeParams, antiActiveParams, searchParams, currentPath, path]);

  const handleClick = () => {
    const queryParams = new URLSearchParams();
    activeParams?.forEach((param) => {
      queryParams.set(param.key, param.value);
    });
    router.push(`${path}?${queryParams.toString()}`);
  };

  return (
    <Button
      onClick={handleClick}
      variant={isActive ? 'flat' : 'light'}
      color={isActive ? 'primary' : 'default'}
      className="w-full justify-start"
    >
      {icon}
      {title}
    </Button>
  );
}
