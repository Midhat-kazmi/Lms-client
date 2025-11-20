import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string;               // access token after login
  activationToken: string;     // activation token after register
  user: string | null;
}

const initialState: AuthState = {
  token: "",
  activationToken: "",
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userRegistration: (state, action: PayloadAction<{ activationToken: string }>) => {
      state.activationToken = action.payload.activationToken;
    },
    userLogedIn: (
      state,
      action: PayloadAction<{ access_token: string; user: string }>
    ) => {
      state.token = action.payload.access_token;
      state.user = action.payload.user;
    },
    userLogout: (state) => {
      state.token = "";
      state.activationToken = "";
      state.user = null;
    },
  },
});

export const { userRegistration, userLogedIn, userLogout } = authSlice.actions;
export default authSlice.reducer;
