"use client";
import * as React from "react";
import {
  Box,
  Typography,
  Container,
  CircularProgress,
  Alert,
} from "@mui/material";

import type { Post } from "@/types/app";
import { useAppSelector } from "@/lib/hooks";
import { useMounted } from "@/hooks/use-mounted";
import PostList from "@/components/posts/post-list";
import { selectPosts } from "@/lib/features/posts/postsSlice";
import CreatePostForm from "@/components/posts/create-post-form";

export default function InfiniteDemoPage() {
  const allPostsRef = React.useRef(useAppSelector(selectPosts));
  const allPosts = allPostsRef.current;

  const [posts, setPosts] = React.useState<Post[]>([]);
  const [page, setPage] = React.useState<number>(1);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [hasReachedEnd, setHasReachedEnd] = React.useState<boolean>(false);

  const hasMounted = useMounted();

  const POSTS_PER_PAGE = 4;

  const startFetching = React.useCallback(
    async function () {
      setIsLoading(true);
      const nextPosts = await fetchNextPosts(allPosts, page, POSTS_PER_PAGE);

      if (nextPosts === null) {
        setHasReachedEnd(true);
      } else {
        setPosts((prevPosts) => [...prevPosts, ...nextPosts]);
      }
      setIsLoading(false);
    },
    [page, allPosts]
  );

  React.useEffect(() => {
    function handleScroll() {
      if (hasReachedEnd) {
        return;
      }

      const scrollHeight = document.documentElement.scrollHeight;
      const currentHeight =
        document.documentElement.scrollTop + window.innerHeight;
      if (currentHeight + 1 >= scrollHeight) {
        setPage(page + 1);
      }
    }

    if (hasMounted) {
      startFetching();
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMounted, hasReachedEnd, page, startFetching]);

  return (
    <Container
      maxWidth="sm"
      // style={{ maxWidth: "768px"}}
    >
      <CreatePostForm />
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6">Feed</Typography>
        <PostList posts={posts} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            my: 4,
          }}
        >
          {isLoading && !hasReachedEnd && <CircularProgress />}
          {hasReachedEnd && (
            <Alert
              icon={false}
              color="info"
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              No more posts available
            </Alert>
          )}
        </Box>
      </Box>
    </Container>
  );
}

// for infinite scrolling simulation
async function fetchNextPosts(
  posts: Post[],
  page: number,
  count: number
): Promise<Post[] | null> {
  const randomDelay = Math.random() * 1500; // between 0-1500ms
  await wait(randomDelay);

  const startIndex = (page - 1) * count;
  const endIndex = startIndex + count;

  // reached end
  if (startIndex >= posts.length) {
    return null;
  }

  const nextPosts = posts.slice(startIndex, endIndex);
  return nextPosts;
}

async function wait(ms: number) {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
}
