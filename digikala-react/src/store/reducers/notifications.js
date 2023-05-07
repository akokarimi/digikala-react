import { createSlice } from "@reduxjs/toolkit";

export const NotificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    global: {},
  },
  reducers: {
    globalFail: (state, action) => {
      state.global.error = true;
      state.global.msg = action.payload;
    },
    globalSucces: (state, action) => {
      state.global.success = true;
      state.global.msg = action.payload;
    },
    clearNotification: (state) => {
      state.global = {};
    },
  },
});

export const { globalFail, globalSucces, clearNotification } =
  NotificationsSlice.actions;
export default NotificationsSlice.reducer;
