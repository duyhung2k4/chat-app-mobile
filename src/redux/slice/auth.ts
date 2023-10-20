import { ProfileModel } from "@/model/profile";
import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../query/api/auth";

interface State {
  profile?: ProfileModel,
}

const initialState: State = {
  profile: undefined,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.loginToken.matchFulfilled, (state, { payload }) => {
      state.profile = payload.data?.profile;
    });

    builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
      state.profile = payload.data?.profile;
    })
  }
})