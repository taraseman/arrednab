import { createSlice } from "@reduxjs/toolkit";
import { User } from "types/user-types";

interface InitialState {
  user: User | null;
}

const user = localStorage.getItem("user");

const initialState: InitialState = {
  user: user ? (JSON.parse(user)).user : null,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: { payload: User }) {
      state.user = action.payload;
    },
    resetUser(state) {
      state.user = null;
    },
  },
});

export const { setUser, resetUser } = slice.actions;

export default slice.reducer;
