import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { globalSucces, globalFail } from "../reducers/notifications";
import { getAuthHeader, removeCookie } from "../../utils/tools";

export const signin = createAsyncThunk(
  "users/signin",
  async (obj, { dispatch }) => {
    try {
      const res = await axios.post("/api/users/login", obj);
      dispatch(globalSucces("با موفقیت وارد شدید"));
      return { data: res.data.data.user, auth: true };
    } catch (err) {
      dispatch(globalFail(err.response.data.message));
      throw err;
    }
  }
);

export const signout = createAsyncThunk("users/signout", async () => {
  removeCookie();
});

export const signup = createAsyncThunk(
  "users/signup",
  async (obj, { dispatch }) => {
    try {
      const res = await axios.post("/api/users/signup", obj);
      dispatch(globalSucces("خوش آمدید"));
      return { data: res.data.data.user, auth: true };
    } catch (err) {
      dispatch(globalFail(err.response.data.message));
      throw err;
    }
  }
);

export const isAuth = createAsyncThunk("users/isAuth", async (thunkAPI) => {
  try {
    const res = await axios.get("/api/users/isAuth", getAuthHeader);

    return { data: res.data.data.user, auth: true };
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

export const addtocart = createAsyncThunk("users/addtocart", async (id) => {
  try {
    const res = await axios.get(`/api/users/addToCart/${id}`, getAuthHeader);

    return {
      data: res.data.data,
    };
  } catch (err) {
    return { data: null, auth: false };
  }
});

export const removefromcart = createAsyncThunk(
  "users/removefromcart",
  async (id) => {
    try {
      const res = await axios.get(
        `/api/users/removeFromCart/${id}`,
        getAuthHeader
      );

      return {
        data: res.data.data,
      };
    } catch (err) {
      return { data: null, auth: false };
    }
  }
);

export const updateProfile = createAsyncThunk(
  "users/updateProfile",
  async (obj, { dispatch }) => {
    try {
      const res = await axios.patch("/api/users/updateMe", obj);
      dispatch(globalSucces("اطلاعات با موفقیت ذخیره شد"));
      return { data: res.data.data.user, auth: true };
    } catch (err) {
      dispatch(globalFail(err.response.data.message));
      throw err;
    }
  }
);

export const updatePassword = createAsyncThunk(
  "users/updatePassword",
  async (obj, { dispatch }) => {
    try {
      const res = await axios.patch("/api/users/updateMyPassword", obj);
      dispatch(globalSucces("اطلاعات با موفقیت ذخیره شد"));
      return { data: res.data.data.user, auth: true };
    } catch (err) {
      dispatch(globalFail(err.response.data.message));
      throw err;
    }
  }
);
