import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

import type { Post, PostComment } from "@/types/app";
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

type EditPostPayloadAction = PayloadAction<{
  postId: string;
  text: string;
  userId: string;
}>;

type ToggleLikePayloadAction = PayloadAction<{
  postId: string;
  userId: string;
}>;

type AddCommentPayloadAction = PayloadAction<{
  text: string;
  postId: string;
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
    editPost: (
      state,
      { payload: { postId, text, userId } }: EditPostPayloadAction
    ) => {
      const postIndex = state.items.findIndex(
        (p) => p.id === postId && p.userId === userId
      );
      if (postIndex !== -1) {
        state.items[postIndex].text = text;
      }
    },
    toggleLike: (
      state,
      { payload: { postId, userId } }: ToggleLikePayloadAction
    ) => {
      const post = state.items.find((p) => p.id === postId);
      if (post) {
        const userIdIndex = post.likes.indexOf(userId);
        if (userIdIndex > -1) {
          // remove like
          post.likes.splice(userIdIndex, 1);
        } else {
          // add like
          post.likes.push(userId);
        }
      }
    },
    addComment: (
      state,
      { payload: { text, postId, userId, userName } }: AddCommentPayloadAction
    ) => {
      const post = state.items.find((p) => p.id === postId);
      if (post) {
        const nextComment: PostComment = {
          id: nanoid(),
          text,
          userId,
          userName,
        };
        post.comments.push(nextComment);
      }
    },
  },
});

export const { createPost, editPost, toggleLike, addComment } =
  postsSlice.actions;

export const selectPosts = (state: RootState) => state.posts.items;

const postsReducer = postsSlice.reducer;
export default postsReducer;
