import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { Products, User } from "../../../types";

export const api = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/`,
  }),
  tagTypes: ["User", "Products", "Customers"],
  endpoints: (builder) => ({
    getUserById: builder.query<User, string>({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),
    getProducts: builder.query<Products[], void>({
      query: () => `client/products`,
      providesTags: ["Products"],
    }),
    getCustomers: builder.query<User[], void>({
      query: () => `client/customers`,
      providesTags: ["Customers"],
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
} = api;
