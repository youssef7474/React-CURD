import { configureStore } from "@reduxjs/toolkit";
import posts from "./postSlice";
import auth from "./authslice"
const store = configureStore({
  reducer: { posts,auth },
});

export default store;