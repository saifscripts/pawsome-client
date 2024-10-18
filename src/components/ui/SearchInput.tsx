'use client';

import { Button } from '@nextui-org/button';
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

export default function SearchInput() {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

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
          <ModalHeader className="block w-full pb-2">Search</ModalHeader>
          <ModalBody>Hello</ModalBody>
          <ModalFooter className="block w-full"></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
