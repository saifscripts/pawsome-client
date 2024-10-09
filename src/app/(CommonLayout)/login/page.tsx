'use client';
import AppForm from '@/components/form/AppForm';
import AppInput from '@/components/form/AppInput';
import AppSubmit from '@/components/form/AppSubmit';
import { useUserLogin } from '@/hooks/auth.hook';
import { loginSchema } from '@/schemas/auth.schema';
import { FieldValues, SubmitHandler } from 'react-hook-form';

export default function LoginPage() {
  const { mutate: loginUser } = useUserLogin();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    loginUser(data);
  };

  return (
    <div className="flex items-center justify-center h-[calc(100svh-64px)]">
      <AppForm
        onSubmit={onSubmit}
        formSchema={loginSchema}
        className="w-full max-w-lg space-y-10"
      >
        <AppInput name="email" label="Email" placeholder="Enter your email" />
        <AppInput
          name="password"
          type="password"
          label="Password"
          placeholder="Enter a password"
        />
        <AppSubmit>Login</AppSubmit>
      </AppForm>
    </div>
  );
}
