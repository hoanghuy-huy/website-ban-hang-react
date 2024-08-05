import { createSlice } from '@reduxjs/toolkit';

export const accountSlice = createSlice({
  name: 'account',
  initialState: {
    showLogin: false,
  },
  reducers: {
    showLoginForm: (state) => {
      state.showLogin = !state.showLogin;
    },
  },
});

export const { showLoginForm } = accountSlice.actions;
export default accountSlice.reducer;