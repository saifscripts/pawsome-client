'use client';

import Form from '@/components/form/Form';
import Input from '@/components/form/Input';
import Submit from '@/components/form/Submit';
import { useMe, useUpdateProfile } from '@/hooks/user.hook';
import { Button } from '@nextui-org/button';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/modal';
import { useEffect } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';

export default function EditProfile() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    mutate: updateProfile,
    data: updatedProfile,
    isPending,
    isSuccess,
  } = useUpdateProfile();
  const { data } = useMe();
  const user = data?.data;

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    updateProfile(data);
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      onClose();
    }
  }, [isPending, isSuccess]);

  if (!user) return null;

  const defaultValues = {
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  };

  return (
    <>
      <Button onPress={onOpen} variant="bordered">
        Edit Profile
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Edit Profile
          </ModalHeader>
          <ModalBody>
            <Form
              className="space-y-6 pb-4"
              onSubmit={handleSubmit}
              defaultValues={defaultValues}
            >
              <Input name="name" label="Name" />
              <Input name="email" label="Email" />
              <Input name="phone" label="Phone" />
              <Submit color="primary" isLoading={isPending}>
                Save Changes
              </Submit>
            </Form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
