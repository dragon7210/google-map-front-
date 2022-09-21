import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./slices/users.js";

export const store = configureStore({
  reducer: {
    users: userSlice,
  },
});
