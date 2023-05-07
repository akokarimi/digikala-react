import axios from "axios";
import { showAlert } from "./alert";

export const registerAnOrder = async (productId) => {
  const res = await axios(`/api/users/addToCart/${productId}`);
  if (res.data.status === "success") {
    showAlert("success", "به سبد خرید اضافه شد");
    window.setTimeout(() => {
      location.reload(true);
    }, 1500);
  }
};

export const removeAnOrder = async (productId) => {
  const res = await axios(`/api/users/removeFromCart/${productId}`);
  if (res.data.status === "success") {
    showAlert("success", "از سبد خرید حذف شد");
    window.setTimeout(() => {
      location.reload(true);
    }, 1500);
  }
};
