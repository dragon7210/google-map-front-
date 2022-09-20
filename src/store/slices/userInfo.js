import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const userInfoSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
  },
});

export const { setUser } = userInfoSlice.actions;

export default userInfoSlice.reducer;
