import { createSlice } from "@reduxjs/toolkit";


interface AuthState {
  token: string | null;
  refreshToken: string | null;
  id: string | null;
}

const savedTokens = localStorage.getItem("auth");

const parsedTokens = savedTokens
  ? (JSON.parse(savedTokens) as AuthState)
  : null;

const initialState: AuthState = parsedTokens
  ? parsedTokens
  : {
      token: null,
      refreshToken: null,
      id: null,
    };

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action: { payload: AuthState }) {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.id = action.payload.id;
    },
    resetAuth(state) {
      state.token = null;
      state.refreshToken = null;
      state.id = null;
    },
  },
});

export const { setAuth, resetAuth } = slice.actions;

export default slice.reducer;
