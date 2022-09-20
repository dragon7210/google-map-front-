import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      return action.payload;
    },
    putUser: (state, action) => {
      return state.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    deleteUser: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const { setUsers, putUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
