import * as React from "react";
import { List } from "@mui/material";

import type { Post } from "@/types/app";
import PostItem from "@/components/posts/post-item";

type Props = {
  posts: Post[];
};

export default function PostList({ posts }: Props) {
  const sortedPosts = React.useMemo(() => [...posts].reverse(), [posts]);

  return (
    <PostListWrapper>
      {sortedPosts.map((post) => (
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
        borderRadius: 1,
        border: 1,
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
