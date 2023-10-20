import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducer";
import { authApi } from "./query/api/auth";
import { basicQueryApi } from "./query/api/basicQuery";
import { advanceFilterApi } from "./query/api/advanceFilter";

const middleware = [
  authApi.middleware,
  basicQueryApi.middleware,
  advanceFilterApi.middleware,
]

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }).concat(middleware),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store