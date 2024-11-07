'use client';

import AppForm from '@/components/form/AppForm';
import AppInput from '@/components/form/AppInput';
import AppSubmit from '@/components/form/AppSubmit';
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
            <AppForm
              className="space-y-6"
              onSubmit={handleSubmit}
              defaultValues={defaultValues}
            >
              <AppInput name="name" label="Name" />
              <AppInput name="email" label="Email" />
              <AppInput name="phone" label="Phone" />
              <AppSubmit isLoading={isPending}>Save Changes</AppSubmit>
            </AppForm>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
