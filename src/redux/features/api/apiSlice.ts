import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLogedIn } from "../auth/authSlice";
import { IUser } from "../../../redux/features/auth/types/user"; 

// ------------------- Types for responses -------------------
interface RefreshTokenResponse {
  access_token: string;
  user: IUser;
}

interface LoadUserResponse {
  access_token: string;
  user: IUser;
}

// ------------------- Type guard for RTK Query errors -------------------
function isFetchBaseQueryError(
  error: unknown
): error is { data?: { message?: string } } {
  return (
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    typeof (error as { data?: unknown }).data === "object"
  );
}

// ------------------- API Slice -------------------
export const apiSlice = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
    credentials: "include",
  }),

  endpoints: (builder) => ({
    refreshtoken: builder.query<RefreshTokenResponse, void>({
      query: () => ({
        url: "/user/refresh",
        method: "GET",
      }),
    }),

    loadUser: builder.query<LoadUserResponse, void>({
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
        } catch (error: unknown) {
          if (isFetchBaseQueryError(error)) {
            console.log(error.data?.message);
          } else {
            console.log("Unexpected error", error);
          }
        }
      },
    }),
  }),
});

export const { useRefreshtokenQuery, useLoadUserQuery } = apiSlice;
