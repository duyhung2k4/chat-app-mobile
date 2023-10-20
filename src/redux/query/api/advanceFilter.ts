import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../baseQuery";
import { endPoint } from "../endpoint";
import { QueryReturnValue } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { AdvanceFilterPayResponse, AdvanceFilterPayload, FILTER_DEFAULT } from "@/payload/advanceFilter";

export const advanceFilterApi = createApi({
  reducerPath: "advanceFilter",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    filter: builder.query<QueryReturnValue<AdvanceFilterPayResponse>, AdvanceFilterPayload>({
      query: (payload) => ({
        ...endPoint.advanceFilter.filter(),
        data: {
          ...FILTER_DEFAULT,
          ...payload,
        },
      })
    })
  })
});

export const { useFilterQuery } = advanceFilterApi;