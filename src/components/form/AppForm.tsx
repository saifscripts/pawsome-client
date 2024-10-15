'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction, useEffect } from 'react';
import {
  FormProvider,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from 'react-hook-form';
import { Schema } from 'zod';

interface IProps {
  children: React.ReactNode;
  onSubmit: SubmitHandler<any>;
  defaultValues?: Record<string, unknown>;
  formSchema?: Schema;
  className?: string;
  setForm?: Dispatch<SetStateAction<UseFormReturn | null>>;
}

export default function AppForm({
  children,
  defaultValues,
  formSchema,
  onSubmit,
  className,
  setForm,
}: IProps) {
  const form = useForm({
    defaultValues,
    resolver: formSchema && zodResolver(formSchema),
  });

  useEffect(() => {
    if (setForm) setForm(form);
  }, []);

  return (
    <FormProvider {...form}>
      <form className={className} onSubmit={form.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
}
