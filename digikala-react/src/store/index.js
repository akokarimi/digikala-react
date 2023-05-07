import { configureStore } from "@reduxjs/toolkit";
import UsersReducer from "./reducers/users";
import ProductsReducer from "./reducers/products";
import NotificationsReducer from "./reducers/notifications";
import SiteReducer from "./reducers/site";

export const store = configureStore({
  reducer: {
    users: UsersReducer,
    products: ProductsReducer,
    notifications: NotificationsReducer,
    site: SiteReducer,
  },
});
