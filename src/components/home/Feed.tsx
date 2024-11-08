'use client';

import PostCard from '@/components/post/PostCard';
import { getPosts } from '@/services/post.service';
import { IPost } from '@/types';
import { Button } from '@nextui-org/button';
import { Chip } from '@nextui-org/chip';
import { XIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import PostCardSkeleton from '../post/PostCardSkeleton';

export default function Feed() {
  const pathname = usePathname();
  const router = useRouter();
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
      if (['sort', 'feed'].includes(key)) return;

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

  const handleReset = () => {
    const feed = searchParams.get('feed');
    const params = new URLSearchParams();
    if (feed) params.set('feed', feed);
    router.replace(pathname + '?' + params.toString());
  };

  return (
    <section className="p-4 space-y-6 flex-1 h-[calc(100svh-64px)] overflow-y-auto">
      <div className="space-y-2 max-w-3xl mx-auto">
        {filters.length > 0 && (
          <p className="text-small text-default-400">Showing results for</p>
        )}
        <div className="flex gap-2 items-center flex-wrap">
          {filters.length > 0 && (
            <>
              {filters.map((value) => (
                <Chip className="capitalize">{value}</Chip>
              ))}
              <Button
                size="sm"
                radius="full"
                color="danger"
                variant="flat"
                isIconOnly
                onClick={handleReset}
              >
                <XIcon size={20} />
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        {posts?.length > 0 &&
          posts.map((post) => (
            <PostCard key={post._id} post={post} author={post.author} />
          ))}

        {hasMore && (
          <div ref={loader} className="space-y-6">
            <PostCardSkeleton />
            <PostCardSkeleton />
          </div>
        )}
      </div>
    </section>
  );
}
