"use client";

import * as React from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import { useAppDispatch } from "@/lib/hooks";
import { addComment } from "@/lib/features/posts/postsSlice";
import { getSession } from "@/lib/auth";

type Props = {
  postId: string;
};

export default function CreateCommentForm({ postId }: Props) {
  const [commentText, setCommentText] = React.useState("");
  const dispatch = useAppDispatch();

  const isFormValid = Boolean(commentText);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const session = getSession();
    if (!session) {
      window.alert("Please login first.");
      return;
    }

    const { userId, fullName } = session;
    dispatch(
      addComment({ text: commentText, postId, userId, userName: fullName })
    );
    setCommentText("");
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        margin="normal"
        fullWidth
        multiline
        rows={1}
        id="comment-textarea"
        name="comment-textarea"
        label="Post your reply"
        value={commentText}
        onChange={(event) => setCommentText(event.target.value)}
      />
      <Button
        type="submit"
        variant="contained"
        size="small"
        sx={{ my: 0.5 }}
        disabled={!isFormValid}
      >
        Reply
      </Button>
    </Box>
  );
}
