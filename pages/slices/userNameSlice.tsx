import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { useUser, Auth } from "@supabase/supabase-auth-helpers/react";
import { useAppSelector } from "../hooks/store";

interface UserName {
  name?: string;
}

const initialState: UserName = {
  name: "",
};

const userNameSlice = createSlice({
  name: "userName",
  initialState,
  reducers: {
    setUserName(state) {},
  },
});

export const { setUserName } = userNameSlice.actions;
export default userNameSlice.reducer;
