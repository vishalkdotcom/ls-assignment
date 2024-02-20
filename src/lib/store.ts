import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

import postsReducer from "@/lib/features/posts/postsSlice";
import usersReducer from "@/lib/features/users/usersSlice";
import { REDUX_PERSIST_KEY } from "@/utils/constants";

const combinedReducers = combineReducers({
  posts: postsReducer,
  users: usersReducer,
});

const persistedReducers = persistReducer(
  { key: REDUX_PERSIST_KEY, version: 1, storage },
  combinedReducers
);

export const makeStore = () => {
  return configureStore({
    reducer: persistedReducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
