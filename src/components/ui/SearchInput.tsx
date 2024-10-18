'use client';

import { getPosts } from '@/services/post-services';
import { IPost } from '@/types';
import { debounce } from '@/utils/debounce';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { Kbd } from '@nextui-org/kbd';
import {
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from '@nextui-org/modal';
import { ChevronRight, SearchIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function SearchInput() {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const searchInput = useRef<HTMLInputElement | null>(null);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedGetPosts = useCallback(
    debounce(async (searchTerm: string) => {
      console.log(searchTerm);
      const { data } = await getPosts({
        searchTerm,
        limit: '5',
        sort: '-createdAt',
        fields: 'title featuredImage',
      });
      if (data?.length) {
        setPosts(data);
      } else {
        setPosts([]);
      }
    }, 500),
    []
  );

  useEffect(() => {
    if (searchTerm) {
      debouncedGetPosts(searchTerm);
    } else {
      setPosts([]);
    }
  }, [searchTerm]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        onOpen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      searchInput?.current?.focus();
      setSearchTerm('');
    }
  }, [isOpen]);

  return (
    <>
      <Button
        aria-label="Search"
        className="bg-default-100 lg:max-w-48 text-default-400"
        endContent={
          <Kbd className="hidden lg:inline-block" keys={['ctrl']}>
            K
          </Kbd>
        }
        startContent={
          <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
        }
        onPress={onOpen}
      >
        <span className="pr-5">Search...</span>
      </Button>
      <Modal
        size="xl"
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
        onOpenChange={onOpenChange}
        placement="center"
        hideCloseButton
      >
        <ModalContent>
          <ModalBody className="p-0">
            <Input
              ref={searchInput}
              aria-label="Search"
              classNames={{
                inputWrapper:
                  'w-full bg-transparent rounded-b-none border-b group-data-[focus-visible=true]:ring-0 group-data-[focus-visible=true]:ring-offset-0',
                input: 'text-sm',
              }}
              endContent={<Kbd className="hidden lg:inline-block">ESC</Kbd>}
              placeholder="Search..."
              startContent={
                <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
              }
              type="search"
              value={searchTerm}
              onValueChange={setSearchTerm}
            />

            {posts?.length > 0 ? (
              <div className="p-4 flex flex-col gap-2">
                {posts.map((post) => (
                  <Link
                    onClick={onClose}
                    href={`/posts/${post._id}`}
                    key={post._id}
                    className="p-2 bg-default-100 rounded-md hover:bg-primary-200 flex gap-2 items-center"
                  >
                    <div className="size-10 rounded-lg">
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        width={50}
                        height={50}
                        className="w-full h-full object-cover object-center rounded-lg"
                      />
                    </div>
                    <div className="flex gap-4 justify-between items-center flex-1">
                      <p>{post.title}</p>
                      <ChevronRight />
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center p-6 text-default-400">
                No result
              </div>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
