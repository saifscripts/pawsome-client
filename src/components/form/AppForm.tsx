import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { Schema } from 'zod';

interface IProps {
  children: React.ReactNode;
  defaultValues?: Record<string, unknown>;
  formSchema?: Schema;
}

export default function AppForm({
  children,
  defaultValues,
  formSchema,
}: IProps) {
  const form = useForm({
    defaultValues,
    resolver: formSchema && zodResolver(formSchema),
  });

  return (
    <FormProvider {...form}>
      <form>{children}</form>
    </FormProvider>
  );
}
