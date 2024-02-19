import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

import type { Post } from "@/types/app";
import type { RootState } from "@/lib/store";
import { posts as initialPosts } from "@/data";

type PostsState = {
  items: Post[];
};

type CreatePostPayloadAction = PayloadAction<{
  text: string;
  userId: string;
  userName: string;
}>;

const initialState: PostsState = {
  items: [...initialPosts],
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    createPost: (
      state,
      { payload: { text, userId, userName } }: CreatePostPayloadAction
    ) => {
      const newPost: Post = {
        id: nanoid(),
        text,
        userId,
        userName,
        likes: [],
        comments: [],
      };
      state.items.push(newPost);
    },
  },
});

export const { createPost } = postsSlice.actions;

export const selectPosts = (state: RootState) => state.posts.items;

const postsReducer = postsSlice.reducer;
export default postsReducer;
