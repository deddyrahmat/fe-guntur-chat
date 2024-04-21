/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
type UserMessageSliceType = {
  currentPage: string;
  data: any;
};

const initialState: UserMessageSliceType = {
  currentPage: '',
  data: {},
};

export const UserMessageSlice = createSlice({
  name: 'userMessage',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    SET_PAGE: (state, action) => {
      state.currentPage = action.payload.currentPage;
      state.data = action.payload.data;
    },
  },
});

export const { SET_PAGE } = UserMessageSlice.actions;

export default UserMessageSlice.reducer;
