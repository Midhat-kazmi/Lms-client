import { apiSlice } from "../api/apiSlice";
import { userLogedIn, userLogout } from "./authSlice";

// --- Define Types ---
type RegistrationResponse = {
  message: string;
  activationtoken: string;
};

type RegistrationData = {
  name?: string;
  email: string;
  password: string;
};

type ActivationData = {
  activation_token: string;
  activation_code: string;
};

type LoginData = {
  email: string;
  password: string;
};

type SocialAuthData = {
  email: string;
  name: string;
  avatar: string;
};

type AuthResponse = {
  access_token: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
};

// --- Inject Endpoints ---
export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegistrationResponse, RegistrationData>({
      query: (data) => ({
        url: "user/register",
        method: "POST",
        body: data,
      }),
    }),

    activation: builder.mutation<{ success: boolean }, ActivationData>({
      query: (data) => ({
        url: "activate-user",
        method: "POST",
        body: data,
      }),
    }),

    login: builder.mutation<AuthResponse, LoginData>({
      query: (data) => ({
        url: "login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLogedIn({
              access_token: result.data.access_token,
              user: result.data.user.name,
            })
          );
        } catch (error) {
          console.log("Login error:", error);
        }
      },
    }),

    socialAuth: builder.mutation<AuthResponse, SocialAuthData>({
      query: (data) => ({
        url: "social-auth",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLogedIn({
              access_token: result.data.access_token,
              user: result.data.user.name,
            })
          );
        } catch (error) {
          console.log("Social auth error:", error);
        }
      },
    }),

    logout: builder.query<{ success: boolean }, void>({
      query: () => ({
        url: "logout",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch }) {
        try {
          dispatch(userLogout());
        } catch (error) {
          console.log("Logout error:", error);
        }
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useActivationMutation,
  useLoginMutation,
  useSocialAuthMutation,
  useLogoutQuery,
} = authApi;
