import AppSubmit from '@/components/form/AppSubmit';
import { useFormContext, useWatch } from 'react-hook-form';

export default function Calculate() {
  const { control } = useFormContext();
  const data = useWatch({ control });

  return (
    <AppSubmit
      className="col-span-2"
      disabled={!data.pet || !data.age || !data.weight || !data.activity}
      size="lg"
    >
      Calculate
    </AppSubmit>
  );
}
