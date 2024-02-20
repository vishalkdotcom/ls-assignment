import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
  Avatar,
  Collapse,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

import type { Post } from "@/types/app";
import { useAppDispatch } from "@/lib/hooks";
import { toggleLike } from "@/lib/features/posts/postsSlice";
import { getSession } from "@/lib/auth";
import PostAction from "@/components/posts/post-action";
import CommentList from "@/components/posts/comment-list";
import CreateCommentForm from "@/components/posts/create-comment-form";
import EditPostForm from "@/components/posts/edit-post-form";

type Props = {
  post: Post;
};

export default function PostItem({ post }: Props) {
  const [areCommentsVisible, setAreCommentsVisible] = React.useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);

  const dispatch = useAppDispatch();
  const { id: postId, text, userName, likes, comments } = post;
  const { userId } = getSession() ?? {};

  function handleLikeOnPost() {
    if (!userId) {
      return;
    }
    dispatch(toggleLike({ postId, userId }));
  }

  function toggleShowComments() {
    setAreCommentsVisible(!areCommentsVisible);
  }

  function handleOpenEditDialog() {
    setIsEditDialogOpen(true);
  }

  function handleCloseEditDialog() {
    setIsEditDialogOpen(false);
  }

  return (
    <React.Fragment>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={userName} />
        </ListItemAvatar>

        <ListItemText
          primary={<Typography variant="subtitle1">{userName}</Typography>}
          secondaryTypographyProps={{ component: "div" }}
          secondary={
            <>
              <PostInnerWrapper>
                <Typography variant="body1">{text}</Typography>
                <PostActionsWrapper>
                  <PostAction
                    label={likes.length}
                    icon={FavoriteBorderIcon}
                    highlight={!!userId && likes.includes(userId)}
                    onClick={handleLikeOnPost}
                  />

                  <PostAction
                    label={comments.length}
                    icon={ChatBubbleOutlineIcon}
                    onClick={toggleShowComments}
                  />

                  {userId === post.userId && (
                    <PostAction
                      label="Edit"
                      icon={EditOutlinedIcon}
                      onClick={handleOpenEditDialog}
                    />
                  )}
                </PostActionsWrapper>

                <Collapse in={areCommentsVisible} timeout="auto" unmountOnExit>
                  <Divider variant="fullWidth" />
                  <CommentList comments={comments} />
                  <CreateCommentForm postId={postId} />
                </Collapse>
              </PostInnerWrapper>
            </>
          }
        />
      </ListItem>

      <Dialog onClose={handleCloseEditDialog} open={isEditDialogOpen}>
        <DialogTitle>Edit Post</DialogTitle>
        <DialogContent>
          <EditPostForm
            id={postId}
            text={text}
            onEditComplete={handleCloseEditDialog}
          />
        </DialogContent>
      </Dialog>

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
