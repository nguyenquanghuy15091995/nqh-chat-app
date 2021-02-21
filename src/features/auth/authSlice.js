import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {},
    token: '',
    isAdmin: false,
    isLoggedIn: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setIsAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
    signOut: (state) => {
      state.user= {};
      state.token= '';
      state.isAdmin= false;
      state.isLoggedIn= false;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  }
});

export const { setUser, setToken, setIsAdmin, signOut, setIsLoggedIn } = authSlice.actions;

export const selectUser = state => state.auth.user;

export const selectToken = state => state.auth.token;

export const selectIsAdmin = state => state.auth.isAdmin;

export const selectIsLoggedIn = state => state.auth.isLoggedIn;

export default authSlice.reducer;