import Submit from '@/components/form/Submit';
import { useFormContext, useWatch } from 'react-hook-form';

export default function Calculate() {
  const { control } = useFormContext();
  const data = useWatch({ control });

  return (
    <Submit
      className="col-span-2"
      disabled={!data.pet || !data.age || !data.weight || !data.activity}
      size="lg"
    >
      Calculate
    </Submit>
  );
}
