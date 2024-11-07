'use client';

import AppForm from '@/components/form/AppForm';
import AppInput from '@/components/form/AppInput';
import AppSubmit from '@/components/form/AppSubmit';
import { useUserLogin } from '@/hooks/auth.hook';
import { loginSchema } from '@/schemas/auth.schema';
import Link from 'next/link';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import ForgetPasswordLink from './_components/ForgetPasswordLink';

export default function LoginPage() {
  const { mutate: loginUser, isPending } = useUserLogin();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    loginUser(data);
  };

  return (
    <div className="flex items-center justify-center h-[calc(100svh-64px)]">
      <AppForm
        onSubmit={onSubmit}
        formSchema={loginSchema}
        className="w-full max-w-md p-8 space-y-6 rounded-xl shadow-lg dark:border dark:border-divider m-4"
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold text-default-800">Welcome Back</h1>
          <p className="mt-2 text-sm text-default-600">
            Please sign in to continue
          </p>
        </div>

        <AppInput
          name="email"
          label="Email"
          placeholder="Enter your email"
          className="rounded-lg"
        />

        <div className="space-y-2">
          <AppInput
            name="password"
            type="password"
            label="Password"
            placeholder="Enter your password"
            className="rounded-lg"
          />
          <div className="flex justify-end">
            <ForgetPasswordLink />
          </div>
        </div>

        <AppSubmit
          variant="solid"
          color="primary"
          isLoading={isPending}
          className="rounded-lg"
        >
          Sign In
        </AppSubmit>

        <div className="text-center text-sm text-default-600">
          Don't have an account?{' '}
          <Link
            href="/register"
            className="text-primary-400 hover:text-primary-500 hover:underline"
          >
            Sign up
          </Link>
        </div>
      </AppForm>
    </div>
  );
}
