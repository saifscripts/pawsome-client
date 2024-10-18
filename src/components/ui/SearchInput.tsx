'use client';

import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { Kbd } from '@nextui-org/kbd';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/modal';
import { SearchIcon } from 'lucide-react';
import { useEffect } from 'react';

export default function SearchInput() {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

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

  return (
    <>
      <Button
        aria-label="Search"
        className="bg-default-100 lg:max-w-48 text-default-400"
        endContent={
          <Kbd className="hidden lg:inline-block" keys={['command']}>
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
      >
        <ModalContent>
          <ModalHeader className="block w-full pb-2">
            <Input
              aria-label="Search"
              classNames={{
                inputWrapper: 'bg-default-100 lg:max-w-48',
                input: 'text-sm',
              }}
              endContent={
                <Kbd className="hidden lg:inline-block" keys={['command']}>
                  K
                </Kbd>
              }
              labelPlacement="outside"
              placeholder="Search..."
              startContent={
                <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
              }
              type="search"
            />
          </ModalHeader>
          <ModalBody>Hello</ModalBody>
          <ModalFooter className="block w-full"></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
