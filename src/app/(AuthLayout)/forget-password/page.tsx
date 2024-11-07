'use client';
import AppForm from '@/components/form/AppForm';
import AppInput from '@/components/form/AppInput';
import AppSubmit from '@/components/form/AppSubmit';
import { useForgetPassword } from '@/hooks/auth.hook';
import { forgetPasswordSchema } from '@/schemas/auth.schema';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FieldValues, SubmitHandler } from 'react-hook-form';

export default function ForgetPasswordPage() {
  const { mutate: forgetPassword, isPending } = useForgetPassword();
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
        className="w-full max-w-md p-8 space-y-6 rounded-xl shadow-lg dark:border dark:border-divider"
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold text-default-800">
            Forgot Password
          </h1>
          <p className="mt-2 text-sm text-default-600">
            Enter your email to reset your password
          </p>
        </div>

        <AppInput
          name="email"
          label="Email"
          placeholder="Enter your email"
          className="rounded-lg"
        />

        <AppSubmit
          variant="solid"
          color="primary"
          isLoading={isPending}
          className="rounded-lg"
        >
          Reset Password
        </AppSubmit>

        <div className="text-center text-sm text-default-600">
          Remember your password?{' '}
          <Link
            href="/login"
            className="text-primary-400 hover:text-primary-500 hover:underline"
          >
            Sign in
          </Link>
        </div>
      </AppForm>
    </div>
  );
}
