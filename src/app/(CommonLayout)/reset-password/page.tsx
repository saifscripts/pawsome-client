'use client';

import AppForm from '@/components/form/AppForm';
import AppInput from '@/components/form/AppInput';
import AppSubmit from '@/components/form/AppSubmit';
import { useResetPassword } from '@/hooks/auth.hook';
import { resetPasswordSchema } from '@/schemas/auth.schema';
import { useSearchParams } from 'next/navigation';
import { FieldValues, SubmitHandler } from 'react-hook-form';

export default function ResetPasswordPage() {
  const { mutate: resetPassword } = useResetPassword();
  const searchParams = useSearchParams();

  const token = searchParams.get('token');

  if (!token) {
    return (
      <div className="flex items-center justify-center h-[calc(100svh-64px)]">
        <p>Invalid token</p>
      </div>
    );
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    data.token = token;
    resetPassword(data);
  };

  return (
    <div className="flex items-center justify-center h-[calc(100svh-64px)]">
      <AppForm
        onSubmit={onSubmit}
        formSchema={resetPasswordSchema}
        className="w-full max-w-lg space-y-10"
      >
        <AppInput
          name="password"
          type="password"
          label="New Password"
          placeholder="Enter a new password"
        />
        <AppSubmit>Reset Password</AppSubmit>
      </AppForm>
    </div>
  );
}
