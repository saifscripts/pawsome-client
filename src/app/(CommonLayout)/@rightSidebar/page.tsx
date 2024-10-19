'use client';

import { Accordion, AccordionItem } from '@nextui-org/accordion';
import { Checkbox } from '@nextui-org/checkbox';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export default function RightSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const appendParam = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.append(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const deleteParam = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleCategoryChange = (checked: boolean, value: string) => {
    let params: string;

    if (checked) {
      params = appendParam('category', value);
    } else {
      params = deleteParam('category', value);
    }

    router.replace(pathname + '?' + params);
  };

  const handleContentTypeChange = (checked: boolean, value: string) => {
    let params: string;

    if (checked) {
      params = appendParam('isPremium', value);
    } else {
      params = deleteParam('isPremium', value);
    }

    router.replace(pathname + '?' + params);
  };

  return (
    <aside className="w-[300px] h-full border-l border-divider p-4">
      <Accordion
        selectionMode="multiple"
        variant="bordered"
        defaultExpandedKeys={['1', '2']}
      >
        <AccordionItem key="1" aria-label="Categories" title="Categories">
          <div className="flex flex-col gap-2">
            <Checkbox
              isSelected={searchParams.getAll('category').includes('tip')}
              onValueChange={(checked) => handleCategoryChange(checked, 'tip')}
            >
              Tip
            </Checkbox>
            <Checkbox
              isSelected={searchParams.getAll('category').includes('story')}
              onValueChange={(checked) =>
                handleCategoryChange(checked, 'story')
              }
            >
              Story
            </Checkbox>
          </div>
        </AccordionItem>
        <AccordionItem key="2" aria-label="Content Type" title="Content Type">
          <div className="flex flex-col gap-2">
            <Checkbox
              isSelected={searchParams.getAll('isPremium').includes('false')}
              onValueChange={(checked) =>
                handleContentTypeChange(checked, 'false')
              }
            >
              Free
            </Checkbox>
            <Checkbox
              isSelected={searchParams.getAll('isPremium').includes('true')}
              onValueChange={(checked) =>
                handleContentTypeChange(checked, 'true')
              }
            >
              Premium
            </Checkbox>
          </div>
        </AccordionItem>
      </Accordion>
    </aside>
  );
}
