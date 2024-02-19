import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import {
  Avatar,
  Divider,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import type { Post } from "@/content/posts";
import PostAction from "./post-action";

type Props = {
  post: Post;
};

export default function PostItem({ post }: Props) {
  const { id, postText, username, likes, comments } = post;

  return (
    <React.Fragment key={id}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={username} />
        </ListItemAvatar>

        <ListItemText
          primary={<Typography variant="subtitle1">{username}</Typography>}
          secondaryTypographyProps={{ component: "div" }}
          secondary={
            <PostInnerWrapper>
              <Typography variant="body1">{postText}</Typography>
              <PostActionsWrapper>
                <PostAction label={likes} icon={FavoriteBorderIcon} />
                <PostAction
                  label={comments.length}
                  icon={ChatBubbleOutlineIcon}
                />
              </PostActionsWrapper>
            </PostInnerWrapper>
          }
        />
      </ListItem>
      <Divider variant="fullWidth" component="li" />
    </React.Fragment>
  );
}

function PostInnerWrapper({ children }: React.PropsWithChildren) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {children}
    </Box>
  );
}

function PostActionsWrapper({ children }: React.PropsWithChildren) {
  return (
    <Box sx={{ display: "flex", gap: 4, marginLeft: -0.75 }}>{children}</Box>
  );
}
