import { Button } from '@nextui-org/button';

interface IProps {
  children?: React.ReactNode;
}

export default function AppSubmit({ children }: IProps) {
  return (
    <Button type="submit" className="w-full">
      {children || 'Submit'}
    </Button>
  );
}
