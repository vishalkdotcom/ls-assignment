"use client";

import * as React from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import { useAppDispatch } from "@/lib/hooks";
import { createPost } from "@/lib/features/posts/postsSlice";
import { getSession } from "@/lib/auth";

export default function CreatePostForm() {
  const [postText, setPostText] = React.useState("");
  const dispatch = useAppDispatch();

  const isFormValid = Boolean(postText);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const session = getSession();
    if (!session) {
      return;
    }

    const { userId, fullName } = session;
    dispatch(createPost({ text: postText, userId, userName: fullName }));
    setPostText("");
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        margin="normal"
        fullWidth
        multiline
        rows={3}
        id="post-textarea"
        name="post-textarea"
        label="What is happening?!"
        value={postText}
        onChange={(event) => setPostText(event.target.value)}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{ my: 1 }}
        disabled={!isFormValid}
      >
        Post
      </Button>
    </Box>
  );
}
