import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import messageReducer from "../slices/messageSlice";
import usernameSlice from "../slices/userNameSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    message: messageReducer,
    userName: usernameSlice,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
