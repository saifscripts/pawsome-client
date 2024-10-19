'use client';

import PostCard from '@/components/post/PostCard';
import { getPosts } from '@/services/post-services';
import { IPost } from '@/types';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function HomePage() {
  const [page, setPage] = useState(0);
  const [limit] = useState(10);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [hasMore, setHasMore] = useState(true);
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
  }, [page, searchParams]);

  useEffect(() => {
    setPage(0);
    setPosts([]);
    setHasMore(true);
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
