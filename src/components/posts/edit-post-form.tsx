"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import { useAppDispatch } from "@/lib/hooks";
import { editPost } from "@/lib/features/posts/postsSlice";
import { getSession } from "@/lib/auth";

type Props = {
  id: string;
  text: string;
  onEditComplete?: () => void;
};

export default function EditPostForm({
  id: postId,
  text: initialText,
  onEditComplete,
}: Props) {
  const [postText, setPostText] = React.useState(initialText);
  const dispatch = useAppDispatch();

  const isFormValid = Boolean(postText);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const session = getSession();
    if (!session) {
      window.alert("Please login first.");
      return;
    }

    const { userId } = session;
    dispatch(editPost({ text: postText, userId, postId }));
    setPostText("");
    onEditComplete?.();
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
        Edit
      </Button>
    </Box>
  );
}
