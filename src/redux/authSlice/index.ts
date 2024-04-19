/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
type AuthSliceType = {
  token: string;
  role: string;
  email: string;
};

const localAuth: any = localStorage.getItem('auth');
const initialState: AuthSliceType = localAuth
  ? JSON.parse(localAuth)
  : { token: '', email: '', role: '' };

export const UserSlice = createSlice({
  name: 'userAuth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    USER_LOGIN: (state, action) => {
      state.token = action.payload.access_token;
      state.role = action.payload.role;
      state.email = action.payload.email;
    },
    USER_LOGOUT: (state) => {
      state.token = '';
      localStorage.removeItem('auth');
    },
  },
});

export const { USER_LOGIN, USER_LOGOUT } = UserSlice.actions;

export default UserSlice.reducer;
