import { createSlice } from "@reduxjs/toolkit";
import { User } from "types/user-types";

export interface Users {
  [key: string]: User;
}

interface InitialState {
  users: Users | null;
}

export interface UpdateUser {
  id: string;
  photoUrl?: string;
  firstName?: string;
  lastName?: string;
}

const initialState: InitialState = {
  users: null,
};

const slice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers(state, action: { payload: Users }) {
      state.users = action.payload;
    },
    updateUser(state, action: { payload: UpdateUser }) {
      if (state.users && state.users[action.payload.id]) {
        state.users[action.payload.id] = {
          ...state.users[action.payload.id],
          ...action.payload,
        };
      }
    },
    resetUsers(state) {
      state.users = null;
    },
  },
});

export const { setUsers, resetUsers, updateUser } = slice.actions;

export default slice.reducer;
