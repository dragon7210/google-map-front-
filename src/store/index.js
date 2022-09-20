import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./slices/users.js";
import userInfoSlice from "./slices/userInfo.js";

export const store = configureStore({
  reducer: {
    users: userSlice,
    userInfo: userInfoSlice,
  },
});
