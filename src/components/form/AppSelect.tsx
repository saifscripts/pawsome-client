'use client';

import { Select, SelectItem } from '@nextui-org/select';
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

export default function AppSelect({
  name,
  variant = 'bordered',
  options = [],
  onChange,
  ...props
}: IProps) {
  const {
    setValue,
    formState: { errors },
  } = useFormContext();

  const selectedValue = useWatch({
    name,
  });

  return (
    <Select
      errorMessage={errors[name]?.message as string}
      isInvalid={!!errors[name]}
      variant={variant}
      selectedKeys={[selectedValue]}
      onChange={(e) => {
        setValue(name, e.target.value);
        onChange?.();
      }}
      {...props}
    >
      {options.map((option) => (
        <SelectItem key={option.key}>{option.label}</SelectItem>
      ))}
    </Select>
  );
}
