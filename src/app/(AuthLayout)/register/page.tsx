'use client';
import AppForm from '@/components/form/AppForm';
import AppInput from '@/components/form/AppInput';
import AppSubmit from '@/components/form/AppSubmit';
import { useUserRegistration } from '@/hooks/auth.hook';
import { registerSchema } from '@/schemas/auth.schema';
import Link from 'next/link';
import { FieldValues, SubmitHandler } from 'react-hook-form';

export default function RegisterPage() {
  const { mutate: registerUser, isPending } = useUserRegistration();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    registerUser(data);
  };

  return (
    <div className="flex items-center justify-center h-[calc(100svh-64px)]">
      <AppForm
        onSubmit={onSubmit}
        formSchema={registerSchema}
        className="w-full max-w-md p-8 space-y-6 rounded-xl shadow-lg dark:border dark:border-divider m-4"
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold text-default-800">
            Create Account
          </h1>
          <p className="mt-2 text-sm text-default-600">
            Please fill in your details to register
          </p>
        </div>

        <AppInput
          name="name"
          label="Name"
          placeholder="Enter your name"
          className="rounded-lg"
        />

        <AppInput
          name="email"
          label="Email"
          placeholder="Enter your email"
          className="rounded-lg"
        />

        <AppInput
          name="phone"
          label="Phone"
          placeholder="Enter your phone number"
          className="rounded-lg"
        />

        <AppInput
          name="password"
          type="password"
          label="Password"
          placeholder="Enter a password"
          className="rounded-lg"
        />

        <AppSubmit
          variant="solid"
          color="primary"
          isLoading={isPending}
          className="rounded-lg"
        >
          Register
        </AppSubmit>

        <div className="text-center text-sm text-default-600">
          Already have an account?{' '}
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
