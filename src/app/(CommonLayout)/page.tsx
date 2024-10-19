'use client';

import PostCard from '@/components/post/PostCard';
import { getPosts } from '@/services/post-services';
import { IPost } from '@/types';
import { Button } from '@nextui-org/button';
import { Chip } from '@nextui-org/chip';
import { XIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function HomePage() {
  const pathname = usePathname();
  const route = useRouter();
  const [page, setPage] = useState(0);
  const [limit] = useState(10);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState<string[]>([]);
  const loader = useRef(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (page > 0) {
      (async () => {
        const params = new URLSearchParams(searchParams.toString());
        params.append('limit', String(limit));
        params.append('page', String(page));

        const { data } = await getPosts(params);

        if (data?.length) {
          setPosts((prev) => [...prev, ...data]);
        }

        if (data?.length < limit) {
          setHasMore(false);
        }
      })();
    }
  }, [page]);

  useEffect(() => {
    setPage(0);
    setPosts([]);
    setHasMore(true);

    const filters: string[] = [];

    searchParams.forEach((value, key) => {
      if (key === 'isPremium') {
        filters.push(value === 'true' ? 'premium' : 'free');
        return;
      }
      filters.push(value);
    });

    setFilters(filters);
  }, [searchParams]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver);

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [hasMore]);

  const handleObserver: IntersectionObserverCallback = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <section className="p-4 space-y-4">
      <div className="flex justify-between items-center gap-4">
        <div className="flex gap-2 items-center">
          {filters.length > 0 && (
            <>
              <p className="text-small text-default-400">Showing results for</p>
              {filters.map((value) => (
                <Chip className="capitalize">{value}</Chip>
              ))}
              <Button
                size="sm"
                radius="full"
                color="danger"
                variant="flat"
                isIconOnly
                onClick={() => route.replace(pathname)}
              >
                <XIcon size={20} />
              </Button>
            </>
          )}
        </div>
      </div>
      {posts?.length > 0 &&
        posts.map((post) => (
          <PostCard key={post._id} post={post} author={post.author} />
        ))}

      {hasMore && (
        <div ref={loader}>
          <p>Loading more posts...</p>
        </div>
      )}
    </section>
  );
}
