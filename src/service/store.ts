import { configureStore } from "@reduxjs/toolkit";
import api from "service/api/api";
import authReducer from './auth/authSlice';
import localStorageMiddleware from './middlewares/local-storage';

// import bidReducer from './project/bid-slice';

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    // bid: bidReducer,
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
