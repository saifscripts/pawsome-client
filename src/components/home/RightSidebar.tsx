'use client';

import { useGetTags } from '@/hooks/post.hook';
import { Accordion, AccordionItem } from '@nextui-org/accordion';
import { Button } from '@nextui-org/button';
import { Checkbox } from '@nextui-org/checkbox';
import { Chip } from '@nextui-org/chip';
import { Divider } from '@nextui-org/divider';
import { FilterXIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export default function RightSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data: tags } = useGetTags();

  const appendParam = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.append(name, value);

      if (!params.get('sort')) params.set('sort', '-totalVotes');

      return params.toString();
    },
    [searchParams]
  );

  const deleteParam = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      // @ts-ignore
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

  const handleKeywordChange = (keyword: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (params.get('tags') === keyword) {
      params.delete('tags');
    } else {
      params.set('tags', keyword);
    }

    router.replace(pathname + '?' + params);
  };

  const handleReset = () => {
    const feed = searchParams.get('feed');
    const params = new URLSearchParams();
    if (feed) params.set('feed', feed);
    router.replace(pathname + '?' + params.toString());
  };

  return (
    <aside className="hidden md:block w-[300px] h-[calc(100svh-64px)] overflow-y-auto border-l border-divider p-4">
      <Accordion
        selectionMode="multiple"
        variant="bordered"
        defaultExpandedKeys={['1', '2', '3']}
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
        <AccordionItem key="3" aria-label="Keywords" title="Keywords">
          <div className="flex gap-2 flex-wrap">
            {tags?.data &&
              tags?.data?.length > 0 &&
              tags?.data
                ?.sort((a, b) => {
                  if (b.count > a.count) {
                    return 1;
                  } else if (b.count < a.count) {
                    return -1;
                  } else if (b._id < a._id) {
                    return 1;
                  } else if (b._id > a._id) {
                    return -1;
                  } else {
                    return 0;
                  }
                })
                ?.map((tag) => (
                  <Chip
                    onClick={() => handleKeywordChange(tag._id)}
                    key={tag._id}
                    color={
                      searchParams.get('tags') === tag._id
                        ? 'primary'
                        : 'default'
                    }
                    className="cursor-pointer capitalize"
                  >
                    {tag._id}
                  </Chip>
                ))}
          </div>
          <Divider className="my-4" />
          <div className="flex justify-end">
            <Button
              size="sm"
              color="danger"
              variant="flat"
              onClick={handleReset}
            >
              <FilterXIcon size={16} />
              Reset
            </Button>
          </div>
        </AccordionItem>
      </Accordion>
    </aside>
  );
}
