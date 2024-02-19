import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

import type { User } from "@/types/app";
import type { RootState } from "@/lib/store";
import { users as initialUsers } from "@/data";

type UsersState = {
  items: User[];
};

type CreateUserPayloadAction = PayloadAction<{
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}>;

const initialState: UsersState = {
  items: [...initialUsers],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    createUser: (state, action: CreateUserPayloadAction) => {
      state.items.push({
        ...action.payload,
        id: nanoid(),
      });
    },
  },
});

export const { createUser } = usersSlice.actions;

export const selectUsers = (state: RootState) => state.users.items;

const usersReducer = usersSlice.reducer;
export default usersReducer;
