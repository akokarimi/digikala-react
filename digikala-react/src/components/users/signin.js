import { useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";

import { signin } from "../../store/actions/users";

import { Loader } from "../../utils/tools";

const Signin = () => {
  const users = useSelector((state) => state.users);
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (notifications && notifications.global.success) navigate("/");
  }, [notifications]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("ایمیل نامعتبر است")
        .required("این قسمت نباید خالی باشد")
        .max(80, " طول ایمیل نباید بیشتر از ۸۰ کاراکتر باشد"),
      password: Yup.string()
        .required("این قسمت نباید خالی باشد")
        .max(90, "طول پسورد نباید بیشتر از ۸۰ کاراکتر باشد")
        .min(8, "طول پسورد نباید کمتر از ۸ کاراکتر باشد"),
    }),
    onSubmit: (values) => {
      dispatch(signin(values), dispatch);
    },
  });

  return (
    <form className="signin" onSubmit={formik.handleSubmit}>
      <svg className="form-logo">
        <use xlinkHref="/img/svg-icons.svg#main-icon-farsi"></use>
      </svg>
      <div className="signin-title">
        <p>ورود |</p>
        <Link to="/signup">ثبت‌نام</Link>
      </div>
      <div className="signin-message">
        <p>سلام!</p>
        <p></p>
        لطفا ایمیل و پسورد خود را وارد کنید
      </div>
      {users.loading === true ? (
        <Loader />
      ) : (
        <>
          <div className="signin-info">
            <label className="signin-label" htmlFor="email">
              ایمیل:
            </label>

            {formik.errors.email ? (
              <div className="addcomment__form-error">
                {formik.errors.email}
              </div>
            ) : null}
          </div>
          <input
            className="signin-input"
            type="email"
            id="email"
            name="email"
            dir="ltr"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          <div className="signin-info">
            <label className="signin-label" htmlFor="password">
              پسورد:
            </label>
            {formik.errors.password ? (
              <div className="addcomment__form-error">
                {formik.errors.password}
              </div>
            ) : null}
          </div>
          <input
            className="signin-input"
            id="password"
            name="password"
            type="password"
            dir="ltr"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />

          <button className="signin-btn-2" type="submit">
            ورود
          </button>
        </>
      )}
    </form>
  );
};

export default Signin;
