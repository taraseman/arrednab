import { configureStore } from "@reduxjs/toolkit";
import api from "service/api/api";
import authReducer from './auth/authSlice';
import userReducer from './userSlice';
import articlesReducer from './articlesSlice';
import localStorageMiddleware from './middlewares/local-storage';

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    user: userReducer,
    articles: articlesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      api.middleware,
      localStorageMiddleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
