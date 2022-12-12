import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { User } from "../../../types";

export const api = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/`,
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUserById: builder.query<User, string>({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),
  }),
});

export const { useGetUserByIdQuery } = api;
