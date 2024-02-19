import type { PostComment } from "@/types/app";
import { List } from "@mui/material";

import CommentItem from "@/components/posts/comment-item";

type Props = {
  comments: PostComment[];
};

export default function CommentList({ comments }: Props) {
  return (
    <CommentListWrapper>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </CommentListWrapper>
  );
}

function CommentListWrapper({ children }: React.PropsWithChildren) {
  return <List sx={{ bgcolor: "background.paper", py: 0 }}>{children}</List>;
}
