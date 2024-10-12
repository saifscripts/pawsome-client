'use client';

import AppContentBox from '@/components/form/AppContentBox';
import AppForm from '@/components/form/AppForm';
import AppInput from '@/components/form/AppInput';
import AppSelect from '@/components/form/AppSelect';
import AppSubmit from '@/components/form/AppSubmit';
import { ContentType, PostCategoryOptions } from '@/constants';
import { useCreatePost } from '@/hooks/post.hook';
import { createPostSchema } from '@/schemas/post.schema';
import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form';
import Topbar from './_components/Topbar';

const defaultValues = {
  title: '',
  content: '',
  isPremium: 'free',
  category: '',
};

export default function CreatePost() {
  const {
    mutate: createPost,
    data: newPost,
    isPending,
    isSuccess,
  } = useCreatePost();
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);
  const [form, setForm] = useState<UseFormReturn<
    Record<string, unknown>,
    any,
    undefined
  > | null>(null);

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData();
    formData.append('body', JSON.stringify(data));

    for (let image of imageFiles) {
      formData.append('images', image);
    }

    // console.log(data);
    createPost(formData);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    setImageFiles((prev) => [...prev, file]);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };

      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (!isPending && isSuccess && newPost?.success) {
      form!.reset(defaultValues);
      setImageFiles([]);
      setImagePreviews([]);
    }
  }, [isPending, isSuccess, newPost]);

  return (
    <>
      <Topbar />
      <AppForm
        className="space-y-6 p-6"
        onSubmit={handleSubmit}
        setForm={setForm}
        defaultValues={defaultValues}
        formSchema={createPostSchema}
      >
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          <AppSelect
            name="isPremium"
            label="Content Type"
            options={ContentType}
          />
          <AppSelect
            name="category"
            label="Category"
            placeholder="Select a Category"
            options={PostCategoryOptions}
          />
        </div>
        <AppInput name="title" label="Title" />
        <AppContentBox name="content" />
        {imagePreviews.length > 0 && (
          <div className="flex gap-5 my-5 flex-wrap">
            {imagePreviews.map((imageDataUrl) => (
              <div
                key={imageDataUrl}
                className="relative size-48 rounded-xl border-2 border-dashed border-default-300 p-2"
              >
                <img
                  alt="item"
                  className="h-full w-full object-cover object-center rounded-md"
                  src={imageDataUrl}
                />
              </div>
            ))}
          </div>
        )}
        <div className="min-w-fit flex-1">
          <label
            className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400"
            htmlFor="image"
          >
            Upload image
          </label>
          <input
            multiple
            className="hidden"
            id="image"
            type="file"
            onChange={(e) => handleImageChange(e)}
          />
        </div>
        <AppSubmit isLoading={isPending}>Create Post</AppSubmit>
      </AppForm>
    </>
  );
}
