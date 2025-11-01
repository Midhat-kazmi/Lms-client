import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1", //  adjust base URL as needed
    credentials: "include", // allows sending cookies (for auth)
  }),
  endpoints: (builder) => ({
    //  Example loadUser endpoint
    loadUser: builder.query({
      query: () => "user/me", // adjust this route to match your backend
    }),
  }),
});

// Auto-generated React hooks
export const { useLoadUserQuery } = apiSlice;
