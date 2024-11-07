import AppSelect from '@/components/form/AppSelect';
import { useWatch } from 'react-hook-form';

const ageOptions = {
  dog: [
    { label: 'Puppy (0-6 mo)', key: 'Puppy (0-6 mo)' },
    { label: 'Adult (1-7 yr)', key: 'Adult (1-7 yr)' },
    { label: 'Senior (7+ yr)', key: 'Senior (7+ yr)' },
  ],
  cat: [
    { label: 'Kitten (0-6 mo)', key: 'Kitten (0-6 mo)' },
    { label: 'Adult (1-10 yr)', key: 'Adult (1-10 yr)' },
    { label: 'Senior (10+ yr)', key: 'Senior (10+ yr)' },
  ],
  rabbit: [
    { label: 'Young (0-6 mo)', key: 'Young (0-6 mo)' },
    { label: 'Adult (6 mo - 5 yr)', key: 'Adult (6 mo - 5 yr)' },
    { label: 'Senior (5+ yr)', key: 'Senior (5+ yr)' },
  ],
};

export default function SelectAge() {
  const pet = useWatch({ name: 'pet' });

  return (
    <AppSelect
      label="Age"
      name="age"
      options={ageOptions[pet as keyof typeof ageOptions]}
    />
  );
}
