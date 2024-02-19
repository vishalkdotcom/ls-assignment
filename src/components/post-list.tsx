import * as React from "react";
import { List } from "@mui/material";

import type { Post } from "@/content/posts";
import PostItem from "@/components/post-item";

type Props = {
  posts: Post[];
};

export default function PostList({ posts }: Props) {
  return (
    <PostListWrapper>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </PostListWrapper>
  );
}

function PostListWrapper({ children }: React.PropsWithChildren) {
  return (
    <List
      sx={{
        width: "100%",
        border: 1,
        borderTop: 0,
        borderBottom: 0,
        borderColor: "grey.300",
        bgcolor: "background.paper",
        py: 0,
      }}
    >
      {children}
    </List>
  );
}
