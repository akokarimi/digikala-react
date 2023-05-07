import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import cookie from "react-cookies";

export const Loader = () => {
  return (
    <div className="root-loader">
      <CircularProgress />
    </div>
  );
};
export const Small_Loader = () => {
  return (
    <div className="small-loader">
      <CircularProgress size="1rem" />
    </div>
  );
};

export const showToast = (type, msg) => {
  switch (type) {
    case "SUCCESS":
      toast.success(msg, {
        position: toast.POSITION.TOP_CENTER,
      });
      break;
    case "ERROR":
      toast.error(msg, {
        position: toast.POSITION.TOP_CENTER,
      });
      break;
  }
};

export const getCookie = () => {
  cookie.load("jwt");
};

export const removeCookie = () => {
  cookie.remove("jwt", { path: "/" });
};

export const getAuthHeader = () => {
  return { headers: { Authorization: `Bearer ${getCookie()}` } };
};
