import { configureStore } from "@reduxjs/toolkit";
import api from "service/api/api";
// import bidReducer from './project/bid-slice';

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    // bid: bidReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
