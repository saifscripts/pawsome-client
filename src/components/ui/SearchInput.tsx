'use client';

import { cn } from '@/lib/cn';
import { getPosts } from '@/services/post.service';
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
import { Spinner } from '@nextui-org/spinner';
import { ChevronRight, CrownIcon, SearchIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function SearchInput() {
  const searchInput = useRef<HTMLInputElement | null>(null);
  const route = useRouter();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [posts, setPosts] = useState<IPost[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedGetPosts = useCallback(
    debounce(async (searchTerm: string) => {
      if (searchTerm.trim() === '') {
        setPosts([]);
      } else {
        setIsLoading(true);
        const params = new URLSearchParams({
          searchTerm,
          limit: '5',
          sort: '-createdAt',
          fields: 'title featuredImage isPremium',
        });

        const { data } = await getPosts(params);

        if (data?.length) {
          setPosts(data);
        } else {
          setPosts([]);
        }

        setIsLoading(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        onOpen();
      } else if (e.key === 'ArrowDown' && isOpen) {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < posts.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp' && isOpen) {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === 'Enter' && isOpen) {
        e.preventDefault();
        if (selectedIndex >= 0 && posts[selectedIndex]) {
          route.push(`/posts/${posts[selectedIndex]._id}`);
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [posts, selectedIndex, isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [posts, isOpen]);

  useEffect(() => {
    if (isOpen) {
      searchInput?.current?.focus();
    }
  }, [isOpen]);

  const handleInputChange = (searchTerm: string) => {
    debouncedGetPosts(searchTerm);
  };

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
              onValueChange={handleInputChange}
              //   onChange={(e) => setSearchTerm(e.target.value)}
            />

            {isLoading ? (
              <div className="p-6 flex justify-center items-center">
                <Spinner />
              </div>
            ) : posts?.length > 0 ? (
              <div className="p-4 flex flex-col gap-2">
                {posts.map((post, index) => (
                  <Link
                    onClick={onClose}
                    onMouseOver={() => setSelectedIndex(index)}
                    href={`/posts/${post._id}`}
                    key={post._id}
                    className={cn(
                      'p-2 bg-default-100 rounded-md flex gap-2 items-center',
                      {
                        'bg-primary-200': index === selectedIndex,
                      }
                    )}
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
                      <div className="flex gap-2">
                        {post.isPremium && (
                          <CrownIcon className="text-warning-500" />
                        )}
                        <ChevronRight />
                      </div>
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
