import { useFormik } from "formik";
import * as Yup from "yup";

import { useSelector, useDispatch } from "react-redux";

import { updatePassword } from "../../store/actions/users";

import { Loader } from "../../utils/tools";

const Profile_Password = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      passwordCurrent: "",
      password: "",
      confirmPassword: "",
    },

    validationSchema: Yup.object({
      passwordCurrent: Yup.string()
        .required("این قسمت نباید خالی باشد")
        .max(90, "طول پسورد نباید بیشتر از ۸۰ کاراکتر باشد")
        .min(8, "طول پسورد نباید کمتر از ۸ کاراکتر باشد"),
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
      dispatch(updatePassword(values, dispatch));
    },
  });
  return (
    <>
      {users.loading ? (
        <Loader />
      ) : (
        <form class="profile__form" onSubmit={formik.handleSubmit}>
          <p className="profile__title">تغییر پسورد</p>

          <div className="signin-info">
            <label hmtlFor="passwordCurrent" class="profile__form-labels">
              پسورد فعلی:
            </label>
            {formik.errors.passwordCurrent ? (
              <div className="addcomment__form-error">
                {formik.errors.passwordCurrent}
              </div>
            ) : null}
          </div>
          <input
            type="password"
            class="profile__form-input"
            id="passwordCurrent"
            name="passwordCurrent"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.passwordCurrent}
          />
          <div className="signin-info">
            <label htmlFor="password" class="profile__form-labels">
              پسورد جدید:
            </label>
            {formik.errors.password ? (
              <div className="addcomment__form-error">
                {formik.errors.password}
              </div>
            ) : null}
          </div>
          <input
            type="password"
            class="profile__form-input"
            id="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          <div className="signin-info">
            <label htmlFor="confirmPassword" class="profile__form-labels">
              {" "}
              تکرار پسورد جدید:
            </label>
            {formik.errors.confirmPassword ? (
              <div className="addcomment__form-error">
                {formik.errors.confirmPassword}
              </div>
            ) : null}
          </div>
          <input
            type="password"
            class="profile__form-input"
            id="confirmPassword"
            name="confirmPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          <button
            type="submit"
            className="btn-editprofile btn-profile-updatepassword"
          >
            تغییر پسورد
          </button>
        </form>
      )}
    </>
  );
};

export default Profile_Password;
