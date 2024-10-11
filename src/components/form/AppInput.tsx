'use client';

import { Input } from '@nextui-org/input';
import { useFormContext } from 'react-hook-form';

interface IProps {
  name: string;
  type?: string;
  variant?: 'bordered' | 'flat' | 'faded' | 'underlined' | undefined;
  color?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger';
  size?: 'sm' | 'md' | 'lg';
  label?: React.ReactNode;
  labelPlacement?: 'inside' | 'outside' | 'outside-left';
  placeholder?: string;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
}

export default function AppInput({
  name,
  variant = 'bordered',
  labelPlacement,
  ...props
}: IProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Input
      {...register(name)}
      errorMessage={errors[name]?.message as string}
      isInvalid={!!errors[name]}
      variant={variant}
      labelPlacement={labelPlacement}
      {...props}
    />
  );
}
