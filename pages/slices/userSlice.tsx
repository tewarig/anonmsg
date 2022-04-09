import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { useUser, Auth } from "@supabase/supabase-auth-helpers/react";

interface UserState {
  id?: string;
  email?: string;
  avatarUrl?: string;
  fullName?: string;
}

const initialState: UserState = {
  id: "",
  email: "",
  avatarUrl: "",
  fullName: "",
};

const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser(state) {
      const { user } = useUser();
      state.email = user?.email;
      state.id = user?.id;
      state.avatarUrl = user?.user_metadata?.avatar_url;
      state.fullName = user?.user_metadata.full_name;
    },
  },
});

export const { getUser } = counterSlice.actions;
export default counterSlice.reducer;
