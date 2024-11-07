'use client';

import Form from '@/components/form/Form';
import { Button } from '@nextui-org/button';
import { DownloadIcon, PawPrint } from 'lucide-react';
import { useState } from 'react';
import { Margin, usePDF } from 'react-to-pdf';
import Calculate from './_components/Calculate';
import SelectActivity from './_components/SelectActivity';
import SelectAge from './_components/SelectAge';
import SelectPet from './_components/SelectPet';
import SelectWeight from './_components/SelectWeight';
import { nutritionData } from './nutrition-data';

export default function NutritionCalculatorPage() {
  const [results, setResults] = useState<any>(null);

  const { toPDF, targetRef } = usePDF({
    filename: `nutrition.pdf`,
    page: {
      margin: Margin.SMALL,
    },
    canvas: {
      mimeType: 'image/png',
      qualityRatio: 1,
    },
  });

  const handleSubmit = (data: {
    pet: string;
    age: string;
    weight: string;
    activity: string;
  }) => {
    const petData = nutritionData[data.pet as keyof typeof nutritionData];
    const result = petData.find(
      (item: any) =>
        item.age === data.age &&
        item.weight === data.weight &&
        item.activity === data.activity
    );
    setResults({ ...result, pet: data.pet });
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 xl:grid-cols-5 w-full rounded-lg border border-divider">
        <div className="col-span-2 border-r border-divider">
          <header className="p-6 border-b border-divider">
            <div className="flex items-center gap-3">
              <div className="bg-primary-100 p-2 rounded-lg">
                <PawPrint className="w-6 h-6 text-primary-500" />
              </div>
              <h1 className="text-3xl font-bold">Pet Nutrition Calculator</h1>
            </div>
            <p className="text-default-500 text-sm mt-2">
              Calculate your pet's daily nutritional requirements
            </p>
          </header>
          <Form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="space-y-4">
              <SelectPet />
              <SelectAge />
              <SelectWeight />
              <SelectActivity />
              <Calculate />
            </div>
          </Form>
        </div>
        <div className="col-span-3">
          {results ? (
            <>
              <header className="p-6 border-b border-divider flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-bold">Calculation Results</h1>
                  <p className="text-default-500 text-sm mt-1">
                    View or download your pet's nutrition plan
                  </p>
                </div>
                <Button
                  onPress={() => toPDF()}
                  variant="solid"
                  color="primary"
                  startContent={<DownloadIcon size={16} />}
                  className="h-10"
                >
                  Download PDF
                </Button>
              </header>

              <div className="p-6" ref={targetRef}>
                <div className="bg-gradient-to-r from-primary-400 to-primary-500 p-8 rounded-lg shadow-md mb-8 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-white/10 p-3 rounded-full">
                      <PawPrint className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-white capitalize text-2xl font-bold">
                        {results.pet}'s Nutrition Plan
                      </h2>
                      <p className="text-white text-sm">
                        Personalized daily nutrition recommendations
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 p-4 border border-divider rounded-lg">
                  <div className="space-y-4">
                    <div className="border-b border-divider pb-2">
                      <p className="text-default-500 text-sm font-medium">
                        Pet Information
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <p className="text-default-500">Type:</p>
                        <p className="font-medium capitalize">{results.pet}</p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-default-500">Age Range:</p>
                        <p className="font-medium">{results.age}</p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-default-500">Weight Range:</p>
                        <p className="font-medium">{results.weight}</p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-default-500">Activity Level:</p>
                        <p className="font-medium capitalize">
                          {results.activity}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="border-b border-divider pb-2">
                      <p className="text-default-500 text-sm font-medium">
                        Daily Nutritional Needs
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <p className="text-default-500">Calories (kcal):</p>
                        <p className="font-medium">{results.calories}</p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-default-500">Protein (%):</p>
                        <p className="font-medium">{results.protein}</p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-default-500">Fat (%):</p>
                        <p className="font-medium">{results.fat}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-default-100 rounded-lg">
                  <p className="text-sm text-default-500">
                    Note: These are general guidelines. Please consult with your
                    veterinarian for personalized nutrition advice for your pet.
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <PawPrint className="w-16 h-16 text-default-600 mb-4" />
              <h2 className="text-xl font-semibold text-default-600 mb-2">
                No Results Yet
              </h2>
              <p className="text-default-500 max-w-md">
                Fill out the form on the{' '}
                <span className="hidden xl:inline">left</span>{' '}
                <span className="inline xl:hidden">top</span> to calculate your
                pet's nutritional requirements. The results will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
