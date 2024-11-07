'use client';

import { Select as NextUISelect, SelectItem } from '@nextui-org/select';
import { useFormContext, useWatch } from 'react-hook-form';

interface IProps {
  name: string;
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
  options: { key: string; label: string }[];
  onChange?: () => void;
}

export default function Select({
  name,
  variant = 'bordered',
  options = [],
  onChange,
  ...props
}: IProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const selectedValue = useWatch({
    name,
  });

  return (
    <NextUISelect
      errorMessage={errors[name]?.message as string}
      isInvalid={!!errors[name]}
      variant={variant}
      selectedKeys={[selectedValue]}
      {...register(name)}
      {...props}
    >
      {options.map((option) => (
        <SelectItem key={option.key}>{option.label}</SelectItem>
      ))}
    </NextUISelect>
  );
}
