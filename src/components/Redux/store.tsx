// store.ts
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import userReducer from "./UserSlice";

const store = configureStore({
  reducer: {
    users: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
