'use client';

import ContentBox from '@/components/form/ContentBox';
import Form from '@/components/form/Form';
import Input from '@/components/form/Input';
import Select from '@/components/form/Select';
import Submit from '@/components/form/Submit';
import Textarea from '@/components/form/Textarea';
import { ContentType, PostCategoryOptions } from '@/constants';
import { useEditPost, useGetPost } from '@/hooks/post.hook';
import { updatePostSchema } from '@/schemas/post.schema';
import { Button } from '@nextui-org/button';
import { XIcon } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form';
import Topbar from './_components/Topbar';

export default function EditPostPage() {
  const { postId } = useParams();
  const route = useRouter();
  const { data } = useGetPost(postId as string);
  const post = data?.data;
  const {
    mutate: editPost,
    isPending,
    isSuccess,
    data: updatedPost,
  } = useEditPost();
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const [imageDataUrl, setImageDataUrl] = useState<string>('');
  const [form, setForm] = useState<UseFormReturn | null>(null);

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    form?.clearErrors('featuredImage');
    const formData = new FormData();
    if (imageFile) {
      formData.append('featuredImage', imageFile);
    } else if (imageDataUrl) {
      data.featuredImage = imageDataUrl;
    } else {
      return form?.setError('featuredImage', {
        message: 'Featured Image is required',
      });
    }

    formData.append('body', JSON.stringify(data));

    const options = {
      id: postId as string,
      formData,
    };

    editPost(options);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form?.clearErrors('featuredImage');
    const file = e.target.files![0];
    setImageFile(file);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImageDataUrl(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    form?.setError('featuredImage', {
      message: 'Featured Image is required',
    });
    setImageFile(undefined);
    setImageDataUrl('');
  };

  useEffect(() => {
    setImageDataUrl(post?.featuredImage || '');
  }, [post]);

  useEffect(() => {
    if (!isPending && isSuccess && updatedPost?.success) {
      //   form!.reset(defaultValues);
      //   setImageFiles([]);
      //   setImagePreviews([]);
      route.push(`/posts/${postId}`);
    }
  }, [isPending, isSuccess, post]);

  if (!post) return null;

  const defaultValues = {
    title: post.title,
    summary: post.summary,
    content: post.content,
    isPremium: post.isPremium ? 'premium' : 'free',
    category: post.category,
    tags: post.tags
      .map((tag) => tag[0].toUpperCase() + tag.substring(1))
      .join(', '),
  };

  return (
    <>
      <Topbar />
      <Form
        className="space-y-6 p-6"
        onSubmit={handleSubmit}
        setForm={setForm}
        defaultValues={defaultValues}
        formSchema={updatePostSchema}
      >
        <Input name="title" label="Title" />
        <Textarea
          name="summary"
          label="Post Summary"
          placeholder="Write a brief summary of your post, between 50 and 300 characters."
        />
        <ContentBox name="content" />

        <div className="space-y-2">
          <p className="">Featured Image</p>
          {imageDataUrl ? (
            <div className="relative w-full max-w-lg aspect-video rounded-xl border-2 border-dashed border-default-300 p-2">
              <img
                alt="item"
                className="h-full w-full object-cover object-center rounded-lg"
                src={imageDataUrl}
              />
              <Button
                className="absolute top-0 right-0"
                color="danger"
                size="sm"
                radius="full"
                isIconOnly
                onClick={handleImageRemove}
              >
                <XIcon />
              </Button>
            </div>
          ) : (
            <div className="min-w-fit flex-1">
              <label
                className="flex cursor-pointer items-center justify-center w-full max-w-lg aspect-video rounded-xl border-2 border-dashed border-default-300 p-2 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400"
                htmlFor="image"
              >
                Upload image
              </label>
              <input
                className="hidden"
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e)}
              />
            </div>
          )}
          <p className="text-danger-400 text-small">
            {(form?.formState?.errors?.featuredImage?.message as string) || ''}
          </p>
        </div>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          <Select name="isPremium" label="Content Type" options={ContentType} />
          <Select
            name="category"
            label="Category"
            placeholder="Select a Category"
            options={PostCategoryOptions}
          />
        </div>
        <Input name="tags" label="Tags" placeholder="Tips, Care, Grooming" />
        <Submit isLoading={isPending}>Update Post</Submit>
      </Form>
    </>
  );
}
