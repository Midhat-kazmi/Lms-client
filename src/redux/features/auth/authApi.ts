import { apiSlice } from "../api/apiSlice";
import { userLogedIn, userLogout, userRegistration } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // REGISTER
    register: builder.mutation({
      query: (data) => ({
        url: "/user/register",
        method: "POST",
        body: data,
        credentials: "include",
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userRegistration({
              activationToken: result.data.activationToken,
            })
          );
        } catch (error) {
          console.log("Registration error:", error);
        }
      },
    }),

    // ACTIVATE
    activation: builder.mutation({
      query: ({ activationToken, activationCode }) => ({
        url: "/user/activate-user",
        method: "POST",
        body: { activationToken, activationCode },
        credentials: "include",
      }),
    }),

    // LOGIN
    login: builder.mutation({
      query: (data) => ({
        url: "/user/login",
        method: "POST",
        body: data,
        credentials: "include",
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
          console.log("Login error:", error);
        }
      },
    }),

    // SOCIAL AUTH
    socialAuth: builder.mutation({
      query: (data) => ({
        url: "/user/social-auth",
        method: "POST",
        body: data,
        credentials: "include",
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
          console.log("Social auth error:", error);
        }
      },
    }),

    // LOGOUT (FIXED: must be POST)
    logout: builder.mutation({
      query: () => ({
        url: "/user/logout",
        method: "POST",
        credentials: "include",
      }),

      async onQueryStarted(arg, { dispatch }) {
        dispatch(userLogout());
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useActivationMutation,
  useLoginMutation,
  useSocialAuthMutation,
  useLogoutMutation,
  
} = authApi;
