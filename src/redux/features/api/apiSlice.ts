import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLogedIn } from "../auth/authSlice";

export const apiSlice = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
    credentials: "include",
  }),

  endpoints: (builder) => ({

    refreshtoken: builder.query({
      query: () => ({
        url: "/user/refresh",
        method: "GET",
      }),
    }),

    loadUser: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(
            userLogedIn({
              access_token: result.data.access_token,
              user: result.data.user,
            })
          );
        } catch (error) {
          console.log((error as any)?.data?.message);
        }
      },
    }),

  }),
});

export const { useRefreshtokenQuery, useLoadUserQuery } = apiSlice;
