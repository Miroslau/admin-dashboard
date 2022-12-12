import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer";
import { useDispatch } from "react-redux";
import { api } from "./state/api/api";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefault) => getDefault().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
