import axios from "axios";
import { showAlert } from "./alert";

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/users/login",
      data: {
        email,
        password,
      },
    });

    if (res.data.status === "success") {
      showAlert("success", "با موفقیت وارد شدید");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
  } catch (err) {
    showAlert("fail", err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "/api/users/logout",
    });
    if (res.data.status === "success") location.assign("/");
  } catch (err) {
    showAlert("fail", "خروج از حساب با خطا مواجه شد، دوباره امتحان کنید");
  }
};

export const signup = async function (data) {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/users/signup",
      data,
    });
    if (res.data.status === "success") {
      showAlert("success", "ثبت‌نام با موفقیت انجام شد");
      window.setTimeout(location.assign("/"), 4000);
    }
  } catch (err) {
    let message = "";
    if (err.response.data.error.errors) {
      if (err.response.data.error.errors.name) {
        message = message + err.response.data.error.errors.name.message;
      }
      if (err.response.data.error.errors.family) {
        message = message + err.response.data.error.errors.family.message;
      }
      if (err.response.data.error.errors.email) {
        message = message + err.response.data.error.errors.email.message;
      }
      if (err.response.data.error.errors.password) {
        message = message + err.response.data.error.errors.password.message;
      }
      if (err.response.data.error.errors.confirmPassword) {
        message =
          message + err.response.data.error.errors.confirmPassword.message;
      }
    } else if (err.response.data.message.startsWith("E11000")) {
      message = "این ایمیل از قبل وجود دارد";
    } else {
      message = err.response.data.message;
    }
    showAlert("fail", message);
  }
};
