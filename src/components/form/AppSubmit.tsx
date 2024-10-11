import { Button } from '@nextui-org/button';
import { useFormContext } from 'react-hook-form';

interface IProps {
  children?: React.ReactNode;
  isLoading?: boolean;
}

export default function AppSubmit({ children, isLoading }: IProps) {
  const {
    formState: { isSubmitting },
  } = useFormContext();
  return (
    <Button
      isLoading={isSubmitting || isLoading}
      type="submit"
      className="w-full"
    >
      {children || 'Submit'}
    </Button>
  );
}
