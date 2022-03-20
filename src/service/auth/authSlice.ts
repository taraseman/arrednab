import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  email: string | null;
  token: string | null;
  refreshToken: string | null;
  id: string | null;
}

const initialState: AuthState = {
  email: null,
  token: null,
  refreshToken: null,
  id: null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: { payload: AuthState }) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.id = action.payload.id;
    },
    removeUser(state) {
      state.email = null;
      state.token = null;
      state.refreshToken = null;
      state.id = null;
    },
  },
});

export const { setUser, removeUser } = slice.actions;

export default slice.reducer;
