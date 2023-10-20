import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../baseQuery";
import { endPoint } from "../endpoint";
import { QueryReturnValue } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { LoginPayload, LoginResponse, SendInfoRegisterPayload, SendInfoRegisterReponse } from "../../../payload/auth.payload";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    sendInfoRegister: builder.mutation<QueryReturnValue<SendInfoRegisterReponse>, SendInfoRegisterPayload>({
      query: (payload) => ({
        ...endPoint.auth.sendInfoRegister(),
        data: payload,
      }),
    }),

    sendCodeRegister: builder.mutation<QueryReturnValue, { idTemporaryCredential: number, code: string }>({
      query: (payload) => ({
        ...endPoint.auth.sendCodeRegister(),
        data: payload,
      })
    }),

    login: builder.mutation<QueryReturnValue<LoginResponse>, LoginPayload>({
      query: (payload) => ({
        ...endPoint.auth.login(),
        data: payload,
      })
    }),

    loginToken: builder.mutation<QueryReturnValue<LoginResponse>, undefined>({
      query: () => ({
        ...endPoint.auth.loginToken(),
      })
    })

  })
})

export const { 
  useSendInfoRegisterMutation, 
  useLoginMutation,
  useSendCodeRegisterMutation,
  useLoginTokenMutation,
} = authApi;