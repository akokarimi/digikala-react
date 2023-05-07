import axios from "axios";
import { showAlert } from "./alert";

export const updateSettings = async (data) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: "/api/users/updateMe",
      data: data,
    });

    if (res.data.status === "success") {
      showAlert("success", "تغییرات با موفقیت ذخیره شد");
    }
  } catch (err) {
    let message = "";
    if (err.response.data.error.errors.name)
      message = message + err.response.data.error.errors.name.message;
    if (err.response.data.error.errors.family)
      message = message + err.response.data.error.errors.family.message;
    if (err.response.data.error.errors.email)
      message = message + err.response.data.error.errors.email.message;

    showAlert("fail", message);
  }
};

export const updatePassword = async (data) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: "/api/users/updateMyPassword",
      data: data,
    });

    if (res.data.status === "success") {
      showAlert("success", "تغییرات با موفقیت ذخیره شد");
    }
  } catch (err) {
    if (err.response.data.message.includes("confirmPassword:")) {
      const msg = err.response.data.message.split("confirmPassword:")[1];
      showAlert("fail", msg);
    } else {
      showAlert("fail", err.response.data.message);
    }
  }
};
