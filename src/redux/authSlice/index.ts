/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
type AuthSliceType = {
  token: string;
  role: string;
  username: string;
  email: string;
};

const localAuth: any = localStorage.getItem('auth');
const initialState: AuthSliceType = localAuth
  ? JSON.parse(localAuth)
  : { token: '', username: '', email: '', role: '' };

export const UserSlice = createSlice({
  name: 'userAuth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    USER_LOGIN: (state, action) => {
      state.token = action.payload.access_token;
      state.role = action.payload.role;
      state.email = action.payload.email;
      state.username = action.payload.name;
    },
    USER_LOGOUT: (state) => {
      localStorage.removeItem('auth');
      state.token = '';
      state.role = '';
      state.email = '';
      state.username = '';
    },
  },
});

export const { USER_LOGIN, USER_LOGOUT } = UserSlice.actions;

export default UserSlice.reducer;
