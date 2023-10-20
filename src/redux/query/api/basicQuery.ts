import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../baseQuery";
import { endPoint } from "../endpoint";
import { QueryReturnValue } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { BasicQueryPayResponse, BasicQueryPayload } from "../../../payload/basicQuery.payload";

export const basicQueryApi = createApi({
  reducerPath: "basicQuery",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    insertQuery: builder.mutation<QueryReturnValue<BasicQueryPayResponse>, BasicQueryPayload>({
      query: (payload) => ({
        ...endPoint.basicQuery.query(),
        data: {...payload, option: "insert"}
      })
    }),

    updateQuery: builder.mutation<QueryReturnValue<BasicQueryPayResponse>, BasicQueryPayload>({
      query: (payload) => ({
        ...endPoint.basicQuery.query(),
        data: {...payload, option: "update"}
      })
    }),

    deleteQuery: builder.mutation<QueryReturnValue<BasicQueryPayResponse>, BasicQueryPayload>({
      query: (payload) => ({
        ...endPoint.basicQuery.query(),
        data: {...payload, option: "delete"}
      })
    }),
  })
});

export const { 
  useInsertQueryMutation,
  useUpdateQueryMutation,
  useDeleteQueryMutation,
} = basicQueryApi;