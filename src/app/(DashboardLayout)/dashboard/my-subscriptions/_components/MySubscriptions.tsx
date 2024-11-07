'use client';

import { useGetMySubscriptions } from '@/hooks/subscription.hook';
import { IPaymentStatus, ISubscriptionType } from '@/types';
import { Chip } from '@nextui-org/chip';
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
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

const columns: {
  key: string;
  label: string;
  align: 'start' | 'center' | 'end';
}[] = [
  {
    key: 'txnId',
    label: 'TXN ID',
    align: 'start',
  },
  {
    key: 'createdAt',
    label: 'Payment Date',
    align: 'start',
  },
  {
    key: 'subscriptionType',
    label: 'Subscription Plan',
    align: 'center',
  },
  {
    key: 'status',
    label: 'Status',
    align: 'center',
  },
];

const subscriptionTypeColorMap: Record<
  ISubscriptionType,
  'success' | 'primary'
> = {
  monthly: 'primary',
  yearly: 'success',
};

const statusColorMap: Record<IPaymentStatus, 'success' | 'warning' | 'danger'> =
  {
    success: 'success',
    pending: 'warning',
    failed: 'danger',
  };

export default function MySubscriptions() {
  const { data, isLoading } = useGetMySubscriptions();
  const router = useRouter();

  const renderCell = useCallback((payment: any, columnKey: string) => {
    const [key, subKey] = columnKey.split('.');
    const cellValue = subKey ? payment[key]?.[subKey] : payment[key];

    switch (columnKey) {
      case 'subscriptionType':
        return (
          <Chip
            className="capitalize"
            color={subscriptionTypeColorMap[cellValue as ISubscriptionType]}
            size="sm"
            variant="flat"
          >
            {cellValue as string}
          </Chip>
        );

      case 'status':
        return (
          <Chip
            color={statusColorMap[cellValue as IPaymentStatus]}
            size="sm"
            variant="flat"
          >
            {cellValue as string}
          </Chip>
        );

      case 'createdAt':
        return format(new Date(cellValue as string), 'dd/MM/yyyy');

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
        emptyContent={<div>No payments found</div>}
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
