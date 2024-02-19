"use client";
import * as React from "react";
import { Box, Typography, Container } from "@mui/material";

import PostList from "@/components/posts/post-list";
import { useAppSelector } from "@/lib/hooks";
import { selectPosts } from "@/lib/features/posts/postsSlice";
import CreatePostForm from "@/components/posts/create-post-form";

export default function Home() {
  const posts = useAppSelector(selectPosts);

  return (
    <Container
      maxWidth="sm"
      // style={{ maxWidth: "768px"}}
    >
      <CreatePostForm />
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6">Feed</Typography>
        <PostList posts={posts} />
      </Box>
    </Container>
  );
}
