'use client';
import AppForm from '@/components/form/AppForm';
import AppInput from '@/components/form/AppInput';
import AppSubmit from '@/components/form/AppSubmit';
import { useUserRegistration } from '@/hooks/auth.hook';
import { registerSchema } from '@/schemas/auth.schema';
import { FieldValues, SubmitHandler } from 'react-hook-form';

export default function RegisterPage() {
  const { mutate: registerUser } = useUserRegistration();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    registerUser(data);
  };

  return (
    <div className="flex items-center justify-center h-[calc(100svh-64px)]">
      <AppForm
        onSubmit={onSubmit}
        formSchema={registerSchema}
        className="w-full max-w-lg space-y-10"
      >
        <AppInput name="name" label="Name" placeholder="Enter your name" />
        <AppInput name="email" label="Email" placeholder="Enter your email" />
        <AppInput
          name="phone"
          label="Phone"
          placeholder="Enter your phone number"
        />
        <AppInput
          name="password"
          type="password"
          label="Password"
          placeholder="Enter a password"
        />
        <AppSubmit>Register</AppSubmit>
      </AppForm>
    </div>
  );
}
