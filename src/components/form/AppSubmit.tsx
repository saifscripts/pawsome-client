import { cn } from '@/lib/cn';
import { Button } from '@nextui-org/button';
import { useFormContext } from 'react-hook-form';

interface IProps {
  children?: React.ReactNode;
  isLoading?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | undefined;
}

export default function AppSubmit({
  children,
  isLoading,
  className,
  ...props
}: IProps) {
  const {
    formState: { isSubmitting },
  } = useFormContext();
  return (
    <Button
      isLoading={isSubmitting || isLoading}
      type="submit"
      className={cn('w-full', className)}
      {...props}
    >
      {children || 'Submit'}
    </Button>
  );
}
