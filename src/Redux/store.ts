import { configureStore } from "@reduxjs/toolkit";

// import {} from "./slice/contract";

const reducer = {
  //   contract: "",
};

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type TStore = ReturnType<typeof store.getState>;
export type TDispatch = typeof store.dispatch;
