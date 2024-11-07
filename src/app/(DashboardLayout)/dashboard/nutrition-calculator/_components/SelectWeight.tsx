import AppSelect from '@/components/form/AppSelect';
import { useWatch } from 'react-hook-form';

const weightOptions = {
  dog: [
    { label: '5-10 lbs', key: '5-10 lbs' },
    { label: '10-25 lbs', key: '10-25 lbs' },
    { label: '25-50 lbs', key: '25-50 lbs' },
  ],
  cat: [
    { label: '2-5 lbs', key: '2-5 lbs' },
    { label: '5-10 lbs', key: '5-10 lbs' },
    { label: '10-15 lbs', key: '10-15 lbs' },
  ],
  rabbit: [
    { label: '1-4 lbs', key: '1-4 lbs' },
    { label: '4-7 lbs', key: '4-7 lbs' },
    { label: '7-10 lbs', key: '7-10 lbs' },
  ],
};

export default function SelectWeight() {
  const pet = useWatch({ name: 'pet' });

  return (
    <AppSelect
      label="Weight"
      name="weight"
      options={weightOptions[pet as keyof typeof weightOptions]}
    />
  );
}
