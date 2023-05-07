import { useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";

import { signup } from "../../store/actions/users";

import { Loader } from "../../utils/tools";

const Signup = () => {
  const users = useSelector((state) => state.users);
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (notifications && notifications.global.success) navigate("/");
  }, [notifications]);

  const formik = useFormik({
    initialValues: {
      name: "",
      family: "",
      email: "",
      password: "",
      confimrPassword: "",
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .required("این قسمت نباید خالی باشد")
        .max(80, " طول نام نباید بیشتر از ۸۰ کاراکتر باشد")
        .min(2, "طول نام نباید کمتر از ۲ کاراکتر باشد"),
      family: Yup.string()
        .required("این قسمت نباید خالی باشد")
        .max(80, " طول نام‌خانوادگی نباید بیشتر از ۸۰ کاراکتر باشد")
        .min(2, "طول نام‌خانوادگی نباید کمتر از ۲ کاراکتر باشد"),
      email: Yup.string()
        .email("ایمیل نامعتبر است")
        .required("این قسمت نباید خالی باشد")
        .max(80, " طول ایمیل نباید بیشتر از ۸۰ کاراکتر باشد"),
      password: Yup.string()
        .required("این قسمت نباید خالی باشد")
        .max(90, "طول پسورد نباید بیشتر از ۸۰ کاراکتر باشد")
        .min(8, "طول پسورد نباید کمتر از ۸ کاراکتر باشد"),
      confirmPassword: Yup.string()
        .required("این قسمت نباید خالی باشد")
        .max(90, "طول پسورد نباید بیشتر از ۸۰ کاراکتر باشد")
        .min(8, "طول پسورد نباید کمتر از ۸ کاراکتر باشد"),
    }),
    onSubmit: (values) => {
      dispatch(signup(values, dispatch));
    },
  });

  return (
    <form className="signin" onSubmit={formik.handleSubmit}>
      <svg className="form-logo">
        <use xlinkHref="/img/svg-icons.svg#main-icon-farsi"></use>
      </svg>
      <div className="signin-title">
        <p>ثبت‌نام</p>
      </div>
      <div className="signin-message">
        <p>سلام!</p>
        <p></p>
        لطفا مشخصات خود را وارد کنید
      </div>
      {users.loading === true ? (
        <Loader />
      ) : (
        <>
          <div className="signin-info">
            <label className="signin-label" htmlFor="name">
              نام:
            </label>
            {formik.errors.name ? (
              <div className="addcomment__form-error">{formik.errors.name}</div>
            ) : null}
          </div>
          <input
            className="signin-input"
            type="text"
            id="name"
            name="name"
            dir="ltr"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          <div className="signin-info">
            <label className="signin-label" htmlFor="family">
              نام‌خانوادگی:
            </label>
            {formik.errors.family ? (
              <div className="addcomment__form-error">
                {formik.errors.family}
              </div>
            ) : null}
          </div>
          <input
            className="signin-input"
            id="family"
            name="family"
            type="text"
            dir="ltr"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.family}
          />
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
            id="email"
            name="email"
            type="email"
            dir="ltr"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          <div className="signin-info">
            <label className="signin-label" htmlFor="password">
              رمز عبور:
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
          <div className="signin-info">
            <label className="signin-label" htmlFor="confirm-password">
              تکرار رمز عبور:
            </label>
            {formik.errors.confirmPassword ? (
              <div className="addcomment__form-error">
                {formik.errors.confirmPassword}
              </div>
            ) : null}
          </div>
          <input
            className="signin-input"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            dir="ltr"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          <p className="signin-error"></p>
          <button className="signin-btn-2" type="submit">
            ثبت
          </button>
        </>
      )}
    </form>
  );
};

export default Signup;
