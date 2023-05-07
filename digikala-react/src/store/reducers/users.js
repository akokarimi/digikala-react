import { createSlice } from "@reduxjs/toolkit";
import {
  signin,
  signout,
  signup,
  isAuth,
  addtocart,
  removefromcart,
  updateProfile,
  updatePassword,
} from "../actions/users";

let DEFAULT_USER_STATE = {
  loading: false,
  auth: false,
  err: null,
  data: null,
  orders: null,
};

export const usersSlice = createSlice({
  name: "users",
  initialState: DEFAULT_USER_STATE,
  reducers: {},
  extraReducers: (builer) => {
    builer
      ////signup
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.orders = [...action.payload.data.orders];
        state.auth = action.payload.auth;
      })
      .addCase(signup.rejected, (state, payload) => {
        state.loading = false;
        state.err = payload;
      })
      ///signin
      .addCase(signin.pending, (state) => {
        state.loading = true;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.orders = [...action.payload.data.orders];
        state.auth = action.payload.auth;
      })
      .addCase(signin.rejected, (state, payload) => {
        state.loading = false;
        state.err = payload;
      })
      ///signout
      .addCase(signout.fulfilled, (state, action) => {
        state.loading = false;
        state.data = null;
        state.auth = false;
        state.orders = null;
      })
      /////// is Auth
      .addCase(isAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(isAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.data = { ...state.data, ...action.payload.data };
        state.orders = [...action.payload.data.orders];
        state.auth = action.payload.auth;
      })
      .addCase(isAuth.rejected, (state, payload) => {
        state.loading = false;
        state.auth = false;
        state.data = null;
        state.orders = [];
        state.err = payload.err;
      })
      /////// add to cart;
      .addCase(addtocart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addtocart.fulfilled, (state, action) => {
        state.orders = [...action.payload.data.orders];
        state.loading = false;
      })
      .addCase(addtocart.rejected, (state, payload) => {
        state.loading = false;
        state.err = payload;
      })
      ////////remove from cart
      .addCase(removefromcart.pending, (state) => {
        state.loading = true;
      })
      .addCase(removefromcart.fulfilled, (state, action) => {
        state.orders = [...action.payload.data.orders];
        state.loading = false;
      })
      .addCase(removefromcart.rejected, (state, payload) => {
        state.loading = false;
        state.err = payload;
      })
      ////////Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.data = { ...state.data, ...action.payload.data };
        state.orders = [...action.payload.data.orders];
        state.loading = false;
      })
      .addCase(updateProfile.rejected, (state, payload) => {
        state.loading = false;
        state.err = payload;
      })
      //////Update Password
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.data = { ...state.data, ...action.payload.data };
        state.orders = [...action.payload.data.orders];
        state.loading = false;
      })
      .addCase(updatePassword.rejected, (state, payload) => {
        state.loading = false;
        state.err = payload;
      });
  },
});

export default usersSlice.reducer;
