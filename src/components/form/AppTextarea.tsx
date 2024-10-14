'use client';

import { Textarea } from '@nextui-org/input';
import { useFormContext, useWatch } from 'react-hook-form';

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

export default function AppTextarea({
  name,
  variant = 'bordered',
  labelPlacement,
  className,
  ...props
}: IProps) {
  const {
    setValue,
    formState: { errors },
  } = useFormContext();

  const value = useWatch({ name });

  return (
    <Textarea
      value={value}
      onChange={(e) => setValue(name, e.target.value)}
      errorMessage={errors[name]?.message as string}
      isInvalid={!!errors[name]}
      variant={variant}
      labelPlacement={labelPlacement}
      className={className}
      {...props}
    />
  );
}
