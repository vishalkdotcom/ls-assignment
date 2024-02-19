import type { PostComment } from "@/types/app";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

type Props = {
  comment: PostComment;
};

export default function CommentItem({ comment }: Props) {
  const { text, userName } = comment;

  return (
    <ListItem alignItems="flex-start" sx={{ gap: 2, ml: -2 }}>
      <ListItemAvatar sx={{ minWidth: "auto" }}>
        <Avatar alt={userName} sx={{ height: 32, width: 32 }} />
      </ListItemAvatar>

      <ListItemText
        primary={<Typography variant="subtitle2">{userName}</Typography>}
        secondaryTypographyProps={{ component: "div" }}
        secondary={<Typography variant="body1">{text}</Typography>}
      />
    </ListItem>
  );
}
