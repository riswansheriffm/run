import { configureStore } from "@reduxjs/toolkit";
import pageContentReducer from "./slice/pageContentSlice";

export const store = configureStore({
  reducer: {
    pageContent: pageContentReducer,
  },
});
