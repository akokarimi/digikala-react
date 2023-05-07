import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useDispatch } from "react-redux";
import { updateProfile } from "../../store/actions/users";

const Profile_Form = ({ user }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: user.name,
      family: user.family,
      email: user.email,
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
    }),
    onSubmit: (values) => {
      dispatch(updateProfile(values, dispatch));
    },
  });
  return (
    <>
      <form className="profile__form" onSubmit={formik.handleSubmit}>
        <div className="signin-info">
          <label htmlFor="name" class="profile__form-labels">
            {" "}
            نام:
          </label>
          {formik.errors.name ? (
            <div className="addcomment__form-error">{formik.errors.name}</div>
          ) : null}
        </div>
        <input
          type="text"
          className="profile__form-input"
          id="name"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        <div className="signin-info">
          <label htmlFor="family" class="profile__form-labels">
            {" "}
            نام خانوادگی:
          </label>
          {formik.errors.family ? (
            <div className="addcomment__form-error">{formik.errors.family}</div>
          ) : null}
        </div>
        <input
          type="text"
          class="profile__form-input"
          id="family"
          name="family"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.family}
        />
        <div className="signin-info">
          <label htmlFor="email" class="profile__form-labels">
            {" "}
            ایمیل:
          </label>
          {formik.errors.email ? (
            <div className="addcomment__form-error">{formik.errors.email}</div>
          ) : null}
        </div>
        <input
          type="email"
          class="profile__form-input"
          id="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        <button
          type="submit"
          className="btn-editprofile btn-profile-changesetting"
        >
          {" "}
          ذخیره تنظیمات
        </button>
      </form>
    </>
  );
};

export default Profile_Form;
