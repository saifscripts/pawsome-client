'use client';

import { Input as NextUIInput } from '@nextui-org/input';
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
  className?: string;
}

export default function Input({
  name,
  variant = 'bordered',
  labelPlacement,
  className,
  ...props
}: IProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <NextUIInput
      {...register(name)}
      errorMessage={errors[name]?.message as string}
      isInvalid={!!errors[name]}
      variant={variant}
      labelPlacement={labelPlacement}
      className={className}
      {...props}
    />
  );
}
