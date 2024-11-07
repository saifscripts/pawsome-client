'use client';

import { useDeleteUserModal } from '@/contexts/delete-user.context';
import { useUserRoleModal } from '@/contexts/user-role.context';
import { useUserStatusModal } from '@/contexts/user-status.context';
import { useGetAllUsers } from '@/hooks/admin.hook';
import { IUser } from '@/types';
import { Avatar } from '@nextui-org/avatar';
import { Button } from '@nextui-org/button';
import { Chip } from '@nextui-org/chip';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/dropdown';
import { Pagination } from '@nextui-org/pagination';
import { Spinner } from '@nextui-org/spinner';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/table';
import { EllipsisVerticalIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

const columns: {
  key: string;
  label: string;
  align: 'start' | 'center' | 'end';
}[] = [
  {
    key: 'avatarURL',
    label: 'Avatar',
    align: 'start',
  },
  {
    key: 'name',
    label: 'Name',
    align: 'start',
  },
  {
    key: 'email',
    label: 'Email',
    align: 'start',
  },
  {
    key: 'role',
    label: 'Role',
    align: 'center',
  },
  {
    key: 'status',
    label: 'Status',
    align: 'center',
  },
  {
    key: 'action',
    label: 'Action',
    align: 'center',
  },
];

const roleColorMap: Record<'admin' | 'user', 'success' | 'primary'> = {
  admin: 'success',
  user: 'primary',
};

const statusColorMap: Record<'active' | 'blocked', 'success' | 'danger'> = {
  active: 'success',
  blocked: 'danger',
};

export default function AllUsers() {
  const { data, isLoading } = useGetAllUsers();
  const { onOpen: onOpenUserRole, setUser: setUserRole } = useUserRoleModal();
  const { onOpen: onOpenUserStatus, setUser: setUserStatus } =
    useUserStatusModal();
  const { onOpen: onOpenDeleteUser, setUser: setDeleteUser } =
    useDeleteUserModal();
  const router = useRouter();

  const renderCell = useCallback((user: IUser, columnKey: string) => {
    const cellValue = user[columnKey as keyof IUser];

    switch (columnKey) {
      case 'avatarURL':
        return <Avatar src={cellValue as string} />;

      case 'role':
        return (
          <Chip
            className="capitalize"
            color={roleColorMap[cellValue as 'admin' | 'user']}
            size="sm"
            variant="flat"
          >
            {cellValue as string}
          </Chip>
        );

      case 'status':
        return (
          <Chip
            color={statusColorMap[cellValue as 'active' | 'blocked']}
            size="sm"
            variant="flat"
          >
            {cellValue as string}
          </Chip>
        );

      case 'action':
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <EllipsisVerticalIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem onClick={() => router.push(`/users/${user._id}`)}>
                  View
                </DropdownItem>
                {user.role === 'admin' ? (
                  <DropdownItem
                    onPress={() => {
                      setUserRole(user);
                      onOpenUserRole();
                    }}
                  >
                    Remove Admin
                  </DropdownItem>
                ) : (
                  <DropdownItem
                    onPress={() => {
                      setUserRole(user);
                      onOpenUserRole();
                    }}
                  >
                    Make Admin
                  </DropdownItem>
                )}

                {user.status === 'active' ? (
                  <DropdownItem
                    onPress={() => {
                      setUserStatus(user);
                      onOpenUserStatus();
                    }}
                  >
                    Block
                  </DropdownItem>
                ) : (
                  <DropdownItem
                    onPress={() => {
                      setUserStatus(user);
                      onOpenUserStatus();
                    }}
                  >
                    Unblock
                  </DropdownItem>
                )}
                <DropdownItem
                  onPress={() => {
                    setDeleteUser(user);
                    onOpenDeleteUser();
                  }}
                  className="text-danger"
                  color="danger"
                >
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );

      default:
        return cellValue as string;
    }
  }, []);

  return (
    <Table
      aria-label="Example table with dynamic content"
      isStriped
      bottomContent={
        data?.meta?.totalPages && data?.meta?.totalPages > 1 ? (
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={data?.meta?.page}
              total={data?.meta?.totalPages}
              onChange={(page) => {
                const params = new URLSearchParams();
                params.set('page', page.toString());
                router.replace(`?${params.toString()}`, { scroll: false });
              }}
            />
          </div>
        ) : undefined
      }
      classNames={{
        wrapper: 'min-h-[222px]',
      }}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn align={column.align} key={column.key}>
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        items={data?.data || []}
        isLoading={isLoading}
        loadingContent={<Spinner label="Loading..." />}
        emptyContent={<div>No users found</div>}
      >
        {(item) => (
          <TableRow key={item._id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey as string)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
