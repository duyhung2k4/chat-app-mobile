import { combineReducers } from "redux";
import { authApi } from "./query/api/auth";
import { authSlice } from "./slice/auth";
import { basicQueryApi } from "./query/api/basicQuery";
import { advanceFilterApi } from "./query/api/advanceFilter";

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [basicQueryApi.reducerPath]: basicQueryApi.reducer,
  [advanceFilterApi.reducerPath]: advanceFilterApi.reducer,
})