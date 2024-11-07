import { useDeletePostModal } from '@/contexts/delete-post.context';
import { IPost } from '@/types';
import { Button } from '@nextui-org/button';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/dropdown';
import { EllipsisIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PostDropdown({ post }: { post: IPost }) {
  const router = useRouter();
  const { onOpen, setPost } = useDeletePostModal();

  const handleDelete = () => {
    setPost(post);
    onOpen();
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered" isIconOnly>
          <EllipsisIcon />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem
          onPress={() => {
            router.push(`/dashboard/edit-post/${post._id}`);
            setPost(null);
          }}
          key="edit"
        >
          Edit
        </DropdownItem>
        <DropdownItem
          onPress={handleDelete}
          key="delete"
          className="text-danger"
          color="danger"
        >
          Delete
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
