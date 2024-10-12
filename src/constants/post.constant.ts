export const POST_CATEGORY = {
  TIP: 'tip',
  STORY: 'story',
} as const;

export const PostCategories = ['tip', 'story'] as const;

export const PostCategoryOptions = PostCategories.map((item) => ({
  key: item,
  label: item[0].toUpperCase() + item.substring(1),
}));

export const ContentType = [
  { key: 'free', label: 'Free' },
  { key: 'premium', label: 'Premium' },
];
