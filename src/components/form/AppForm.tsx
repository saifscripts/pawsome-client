'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { Schema } from 'zod';

interface IProps {
  children: React.ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
  defaultValues?: Record<string, unknown>;
  formSchema?: Schema;
  className?: string;
}

export default function AppForm({
  children,
  defaultValues,
  formSchema,
  onSubmit,
  className,
}: IProps) {
  const form = useForm({
    defaultValues,
    resolver: formSchema && zodResolver(formSchema),
  });

  return (
    <FormProvider {...form}>
      <form className={className} onSubmit={form.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
}
