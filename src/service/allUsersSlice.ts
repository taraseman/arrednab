import { createSlice } from "@reduxjs/toolkit";
import { User } from "types/user-types";

interface Users {[key: string]:User}

interface InitialState {
  users: Users;
}

const users = localStorage.getItem("users");

const initialState: InitialState = {
    users: users ? JSON.parse(users).users : null,
};

const slice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers(state, action: { payload: Users }) {
      state.users = action.payload;
    },
    resetUsers(state) {
      state.users = {};
    },
  },
});

export const { setUsers, resetUsers } = slice.actions;

export default slice.reducer;
