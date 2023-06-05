import { configureStore } from "@reduxjs/toolkit";

import { developerReducer } from "./slice/developer";

const reducer = {
  developer: developerReducer,
};

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type TStore = ReturnType<typeof store.getState>;
export type TDispatch = typeof store.dispatch;
