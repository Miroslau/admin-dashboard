import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type {
  Products,
  User,
  Transaction,
  TransactionResponse,
} from "../../../types";

export const api = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/`,
  }),
  tagTypes: ["User", "Products", "Customers", "Transactions"],
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
    getTransactions: builder.query<
      TransactionResponse,
      { page: number; pageSize: number; sort: {}; search: string }
    >({
      query: ({ page, pageSize, sort, search }) => ({
        url: `client/transactions`,
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
} = api;
