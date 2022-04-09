import React, { useState } from "react";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";

interface UserMessage {
  id?: string;
  message?: string;
  userName?: string;
  hint?: string;
}

const initialState: UserMessage = {
  id: "",
  message: "",
  userName: "",
  hint: "",
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    getMessage(state) {},
  },
});

export const { getMessage } = messageSlice.actions;
export default messageSlice.reducer;
