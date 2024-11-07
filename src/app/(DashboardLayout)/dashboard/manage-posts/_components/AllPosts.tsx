'use client';

import { usePublishPostModal } from '@/contexts/publish-post.context';
import { useGetAllPosts } from '@/hooks/admin.hook';
import { IPost } from '@/types';
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
import { format } from 'date-fns';
import { EllipsisVerticalIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

const columns: {
  key: string;
  label: string;
  align: 'start' | 'center' | 'end';
}[] = [
  {
    key: 'featuredImage',
    label: 'Thumbnail',
    align: 'start',
  },
  {
    key: 'title',
    label: 'Title',
    align: 'start',
  },
  {
    key: 'category',
    label: 'Category',
    align: 'center',
  },
  {
    key: 'totalVotes',
    label: 'Total Votes',
    align: 'center',
  },
  {
    key: 'isPublished',
    label: 'Status',
    align: 'center',
  },
  {
    key: 'createdAt',
    label: 'Created At',
    align: 'start',
  },
  {
    key: 'action',
    label: 'Action',
    align: 'center',
  },
];

const categoryColorMap: Record<'story' | 'tip', 'success' | 'primary'> = {
  story: 'success',
  tip: 'primary',
};

const statusColorMap: Record<'true' | 'false', 'success' | 'danger'> = {
  true: 'success',
  false: 'danger',
};

export default function AllPosts() {
  const { data, isLoading } = useGetAllPosts();
  const { onOpen, setPost } = usePublishPostModal();
  const router = useRouter();

  const renderCell = useCallback((post: IPost, columnKey: string) => {
    const cellValue = post[columnKey as keyof IPost];

    switch (columnKey) {
      case 'featuredImage':
        return (
          <Image
            src={cellValue as string}
            alt="thumbnail"
            width={50}
            height={50}
            className="rounded-md"
          />
        );

      case 'title':
        return (cellValue as string)?.substring(0, 32) + '...';

      case 'category':
        return (
          <Chip
            className="capitalize"
            color={categoryColorMap[cellValue as 'story' | 'tip']}
            size="sm"
            variant="flat"
          >
            {cellValue as string}
          </Chip>
        );

      case 'isPublished':
        return (
          <Chip
            color={statusColorMap[cellValue as 'true' | 'false']}
            size="sm"
            variant="flat"
          >
            {cellValue ? 'Published' : 'Unpublished'}
          </Chip>
        );

      case 'createdAt':
        return format(new Date(cellValue as string), 'dd/MM/yyyy');

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
                <DropdownItem onClick={() => router.push(`/posts/${post._id}`)}>
                  View
                </DropdownItem>
                {post.isPublished ? (
                  <DropdownItem
                    onPress={() => {
                      setPost(post);
                      onOpen();
                    }}
                    key="delete"
                    className="text-danger"
                    color="danger"
                  >
                    Unpublish
                  </DropdownItem>
                ) : (
                  <DropdownItem
                    onPress={() => {
                      setPost(post);
                      onOpen();
                    }}
                    key="delete"
                    className="text-success"
                    color="success"
                  >
                    Publish
                  </DropdownItem>
                )}
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
        emptyContent={<div>No posts found</div>}
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
