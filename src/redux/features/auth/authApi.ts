import { apiSlice } from "../api/apiSlice";
import { userLogedIn, userLogout, userRegistration } from "./authSlice";

// --- Define Types ---
type RegistrationResponse = {
  message: string;
  activationToken: string;
};

type RegistrationData = {
  name?: string;
  email: string;
  password: string;
};

type ActivationData = {
  activationToken: string;
  activationCode: string;
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
    // REGISTER (Store activationToken in Redux)
    register: builder.mutation<RegistrationResponse, RegistrationData>({
      query: (data) => ({
        url: "/user/register",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          // Store ONLY the activation token
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

    // ACTIVATE ACCOUNT (UI sends activationToken + code)
    activation: builder.mutation<{ success: boolean }, ActivationData>({
      query: ({ activationToken, activationCode }) => ({
        url: "/user/activate-user",
        method: "POST",
        body: {
          activationToken,
          activationCode,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    // LOGIN
    login: builder.mutation<AuthResponse, LoginData>({
      query: (data) => ({
        url: "/user/login",
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

    // SOCIAL AUTH
    socialAuth: builder.mutation<AuthResponse, SocialAuthData>({
      query: (data) => ({
        url: "/user/social-auth",
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

    // LOGOUT
    logout: builder.query<{ success: boolean }, void>({
      query: () => ({
        url: "/user/logout",
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
