'use client';

import AppForm from '@/components/form/AppForm';
import AppSelect from '@/components/form/AppSelect';
import AppSubmit from '@/components/form/AppSubmit';
import { title } from '@/components/primitives';

const nutritionData = {
  dogs: [
    {
      age: '0-6',
      weight: '5-10',
      activity: 'normal',
      calories: '300-450',
      protein: '20-30',
      fat: '15-20',
    },
    {
      age: '0-6',
      weight: '5-10',
      activity: 'active',
      calories: '350-500',
      protein: '25-35',
      fat: '18-25',
    },
    {
      age: '0-6',
      weight: '5-10',
      activity: 'overweight',
      calories: '250-350',
      protein: '18-25',
      fat: '12-16',
    },
    {
      age: '1-7',
      weight: '5-10',
      activity: 'normal',
      calories: '200-300',
      protein: '15-20',
      fat: '10-15',
    },
    {
      age: '1-7',
      weight: '5-10',
      activity: 'active',
      calories: '250-350',
      protein: '18-25',
      fat: '12-18',
    },
    {
      age: '1-7',
      weight: '5-10',
      activity: 'overweight',
      calories: '150-250',
      protein: '12-18',
      fat: '8-12',
    },
    {
      age: '7+',
      weight: '5-10',
      activity: 'normal',
      calories: '150-250',
      protein: '12-18',
      fat: '8-12',
    },
    {
      age: '7+',
      weight: '5-10',
      activity: 'active',
      calories: '200-300',
      protein: '15-20',
      fat: '10-15',
    },
    {
      age: '7+',
      weight: '5-10',
      activity: 'overweight',
      calories: '120-200',
      protein: '10-15',
      fat: '6-10',
    },
  ],
  cats: [
    {
      age: 'Kitten (0-6 mo)',
      weight: '2-5',
      activity: 'normal',
      calories: '200-250',
      protein: '18-24',
      fat: '8-12',
    },
    {
      age: 'Kitten (0-6 mo)',
      weight: '2-5',
      activity: 'active',
      calories: '220-270',
      protein: '20-26',
      fat: '10-14',
    },
    {
      age: 'Kitten (0-6 mo)',
      weight: '2-5',
      activity: 'overweight',
      calories: '180-230',
      protein: '16-22',
      fat: '6-10',
    },
    {
      age: 'Adult (1-10 yr)',
      weight: '5-10',
      activity: 'normal',
      calories: '180-220',
      protein: '20-25',
      fat: '10-14',
    },
    {
      age: 'Adult (1-10 yr)',
      weight: '5-10',
      activity: 'active',
      calories: '220-260',
      protein: '24-28',
      fat: '12-16',
    },
    {
      age: 'Adult (1-10 yr)',
      weight: '5-10',
      activity: 'overweight',
      calories: '150-200',
      protein: '18-22',
      fat: '8-12',
    },
    {
      age: 'Senior (10+ yr)',
      weight: '5-10',
      activity: 'normal',
      calories: '150-200',
      protein: '18-22',
      fat: '8-12',
    },
    {
      age: 'Senior (10+ yr)',
      weight: '5-10',
      activity: 'active',
      calories: '180-230',
      protein: '20-25',
      fat: '10-14',
    },
    {
      age: 'Senior (10+ yr)',
      weight: '5-10',
      activity: 'overweight',
      calories: '130-180',
      protein: '15-20',
      fat: '6-10',
    },
  ],
};

const petOptions = [
  { label: 'Dog', key: 'dogs' },
  { label: 'Cat', key: 'cats' },
];

const ageOptions = [
  { label: 'Puppy (0-6 mo)', key: '0-6' },
  { label: 'Adult (1-7 yr)', key: '1-7' },
  { label: 'Senior (7+ yr)', key: '7+' },
];

const weightOptions = [
  { label: '5-10 lbs', key: '5-10' },
  { label: '10-20 lbs', key: '10-20' },
  { label: '20-30 lbs', key: '20-30' },
];

const activityOptions = [
  { label: 'Normal', key: 'normal' },
  { label: 'Active', key: 'active' },
  { label: 'Overweight', key: 'overweight' },
];

const handleSubmit = (data: {
  pet: string;
  age: string;
  weight: string;
  activity: string;
}) => {
  console.log(
    nutritionData[data.pet as keyof typeof nutritionData].find(
      (item: any) =>
        item.age === data.age &&
        item.weight === data.weight &&
        item.activity === data.activity
    )
  );
};

export default function NutritionPage() {
  return (
    <div>
      <header className="p-4">
        <h1 className={title({ size: 'sm' })}>Nutrition</h1>
      </header>
      <AppForm onSubmit={handleSubmit} className="p-4 grid grid-cols-5 gap-4">
        <AppSelect label="Pet" name="pet" options={petOptions} />
        <AppSelect label="Age" name="age" options={ageOptions} />
        <AppSelect label="Weight" name="weight" options={weightOptions} />
        <AppSelect label="Activity" name="activity" options={activityOptions} />
        <AppSubmit className="h-full">Calculate</AppSubmit>
      </AppForm>
    </div>
  );
}
