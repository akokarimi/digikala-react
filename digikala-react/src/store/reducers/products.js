import { createSlice } from "@reduxjs/toolkit";
import {
  getAllProducts,
  getProduct,
  addComment,
} from "../../store/actions/products";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    loading: false,
    homeSort: "",
    error: "",
    products: { data: null, status: "fail" },
    product: { data: null, status: "fail" },
    comments: { data: null, loading: "false" },
    current: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      ///get products
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.products = {
          ...{ data: state.products.data, status: "waiting" },
        };
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = { ...action.payload };
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.products = { ...action.payload };
      })
      ///// get one product
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
        state.product = { ...{ data: state.product.data, status: "waiting" } };
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = { ...action.payload };
        state.comments = {
          ...state.comments,
          ...{ data: action.payload.data.reviews, loading: "false" },
        };
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.product = { ...{ data: action.payload, status: "fail" } };
        state.comments = action.payload;
      })
      /////Add Comment
      .addCase(addComment.pending, (state) => {
        state.comments.loading = "true";
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments = {
          ...state.comments,
          ...{ data: action.payload.data.reviews, loading: "false" },
        };
      })
      .addCase(addComment.rejected, (state, action) => {
        state.error = action;
      });
  },
});

export default productsSlice.reducer;
