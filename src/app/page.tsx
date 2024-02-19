import * as React from "react";
import Container from "@mui/material/Container";

import { posts } from "@/content/posts";
import PostList from "@/components/post-list";

export default function Home() {
  return (
    <Container
      maxWidth="sm"
      // style={{ maxWidth: "768px"}}
    >
      <PostList posts={posts} />
    </Container>
  );
}
