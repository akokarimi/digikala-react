import axios from "axios";
import { showAlert } from "./alert";

export const addComment = async function (data, productId) {
  try {
    const res = await axios({
      method: "POST",
      url: `/api/reviews/${productId}`,
      data,
    });
    if (res.data.status === "success") {
      showAlert("success", "نظر با موفقیت ثبت شد.");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
  } catch (err) {
    let message = "";

    if (err.response.data.error.errors) {
      if (err.response.data.error.errors.title)
        message = message + err.response.data.error.errors.title.message;
      if (err.response.data.error.errors.review)
        message = message + err.response.data.error.errors.review.message;
      if (err.response.data.error.errors.rating)
        message = message + err.response.data.error.errors.rating.message;
      return showAlert("fail", message);
    } else {
      return showAlert(err.response.data.message);
      cl;
    }
  }
};
