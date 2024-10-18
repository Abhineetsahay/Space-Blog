import { configureStore } from "@reduxjs/toolkit";
import { blogReducerGetter } from "./reducers/blogReducer.Getter";

const rootReducer = {
  Bloggetter:blogReducerGetter
};

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
