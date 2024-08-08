import { createSlice } from "@reduxjs/toolkit";

// Initial state for the auth slice
const initialState = {
  user: null,
  token: null,
  finxs_token: null,
  finxs_access_code: "AUS-MMSSBA",
};

// Create a slice named "auth" using createSlice function
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Reducer function to set login information in the state
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setFinxsToken: (state, action) => {
      state.finxs_token = action.payload.finxs_token;
    },
  },
});

// Export the reducer function generated by createSlice
export const authReducer = authSlice.reducer;

// Export the actions from the created slice
export const { setLogin, setFinxsToken } = authSlice.actions;