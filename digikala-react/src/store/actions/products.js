import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { globalSucces, globalFail } from "../reducers/notifications";

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (query) => {
    try {
      const res = await axios.get(`/api/products/${query}`);
      let sort;
      if (query.includes("sort=-createdAt")) sort = "جدیدترین";
      if (query.includes("sort=price")) sort = "ارزان‌ترین";
      if (query.includes("sort=-price")) sort = "گران‌ترین";
      if (query.includes("sort=-ratingsAverage")) sort = "بیشترین امتیاز";
      if (query.includes("discount[gt]=0")) sort = "شگفت‌انگیزها";

      return { data: res.data.data.data, status: "success", homeSort: sort };
    } catch (err) {
      throw err;
    }
  }
);

export const getProduct = createAsyncThunk(
  "products/getProduct",
  async (productId) => {
    try {
      const res = await axios.get(`/api/products/${productId}`);
      return { data: res.data.data.data, status: "success" };
    } catch (err) {
      throw err;
    }
  }
);

export const addComment = createAsyncThunk(
  "products/addComment",
  async (data, { dispatch }) => {
    try {
      const res = await axios.post(`/api/reviews`, data);
      if (res.data.status === "success") {
        dispatch(globalSucces("نظرتان با موفقیت ثبت شد"));
        const res2 = await axios.get(`/api/products/${data.product}`);
        return { data: res2.data.data.data, status: "success" };
      } else {
        dispatch(globalFail("خطا! لطفاً دوباره تلاش کنید"));
        throw new Error();
      }
    } catch (err) {
      return err;
    }
  }
);
