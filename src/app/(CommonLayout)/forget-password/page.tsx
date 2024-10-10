'use client';
import AppForm from '@/components/form/AppForm';
import AppInput from '@/components/form/AppInput';
import AppSubmit from '@/components/form/AppSubmit';
import { useForgetPassword } from '@/hooks/auth.hook';
import { forgetPasswordSchema } from '@/schemas/auth.schema';
import { useSearchParams } from 'next/navigation';
import { FieldValues, SubmitHandler } from 'react-hook-form';

export default function ForgetPasswordPage() {
  const { mutate: forgetPassword } = useForgetPassword();
  const searchParams = useSearchParams();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    forgetPassword(data);
  };

  const defaultValues = {
    email: searchParams.get('email') || '',
  };

  return (
    <div className="flex items-center justify-center h-[calc(100svh-64px)]">
      <AppForm
        onSubmit={onSubmit}
        formSchema={forgetPasswordSchema}
        defaultValues={defaultValues}
        className="w-full max-w-lg space-y-10"
      >
        <AppInput name="email" label="Email" placeholder="Enter your email" />
        <AppSubmit>Submit</AppSubmit>
      </AppForm>
    </div>
  );
}
