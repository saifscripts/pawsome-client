import Select from '@/components/form/Select';
import { useWatch } from 'react-hook-form';

const activityOptions = {
  dog: [
    { label: 'Normal', key: 'Normal' },
    { label: 'Active', key: 'Active' },
    { label: 'Overweight', key: 'Overweight' },
  ],
  cat: [
    { label: 'Normal', key: 'Normal' },
    { label: 'Active', key: 'Active' },
    { label: 'Overweight', key: 'Overweight' },
  ],
  rabbit: [
    { label: 'Normal', key: 'Normal' },
    { label: 'Active', key: 'Active' },
    { label: 'Overweight', key: 'Overweight' },
  ],
};

export default function SelectActivity() {
  const pet = useWatch({ name: 'pet' });

  return (
    <Select
      label="Activity"
      name="activity"
      options={activityOptions[pet as keyof typeof activityOptions]}
    />
  );
}
