'use client';
import Form from '@/components/form/Form';
import Input from '@/components/form/Input';
import Submit from '@/components/form/Submit';
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
      <Form
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

        <Input
          name="name"
          label="Name"
          placeholder="Enter your name"
          className="rounded-lg"
        />

        <Input
          name="email"
          label="Email"
          placeholder="Enter your email"
          className="rounded-lg"
        />

        <Input
          name="phone"
          label="Phone"
          placeholder="Enter your phone number"
          className="rounded-lg"
        />

        <Input
          name="password"
          type="password"
          label="Password"
          placeholder="Enter a password"
          className="rounded-lg"
        />

        <Submit
          variant="solid"
          color="primary"
          isLoading={isPending}
          className="rounded-lg"
        >
          Register
        </Submit>

        <div className="text-center text-sm text-default-600">
          Already have an account?{' '}
          <Link
            href="/login"
            className="text-primary-400 hover:text-primary-500 hover:underline"
          >
            Sign in
          </Link>
        </div>
      </Form>
    </div>
  );
}
