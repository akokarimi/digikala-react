import { useFormik } from "formik";
import * as Yup from "yup";

import { useSelector, useDispatch } from "react-redux";
import { addComment } from "../../store/actions/products";

import { showToast } from "../../utils/tools";

const Addcomment = ({ productId }) => {
  const comments = useSelector((state) => state.products.comments);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title: "",
      review: "",
      recommend: "نظری ندارم",
      rating: "2.5",
    },
    validationSchema: Yup.object({
      title: Yup.string("عنوان باید شامل حروف باشد")
        .required("این قسمت نباید خالی باشد")
        .max(25, "عنوان نظر نباید بیشتر از ۲۵ کاراکتر باشد")
        .min(2, "عنوان نظر نباید کمتر از ۲ کاراکتر باشد"),
      review: Yup.string("نظر باید شامل حروف باشد")
        .required("این قسمت نباید خالی باشد")
        .max(120, "عنوان نظر نباید بیشتر از ۱۲۰ کاراکتر باشد")
        .min(20, "عنوان نظر نباید کمتر از ۲۰ کاراکتر باشد"),
      recommend: Yup.string().required("این قسمت نباید خالی باشد"),
      rating: Yup.number("امتیاز باید عدد باشد").required(
        "این قسمت نباید خالی باشد"
      ),
    }),
    onSubmit: (values) => {
      if (users.auth !== true) {
        return showToast("ERROR", "برای نظر دادن نخست وارد شوید!");
      } else {
        const data = {
          title: values.title,
          review: values.review,
          recommend: values.recommend,
          rating: values.rating,
          user: users.data._id,
          product: productId,
        };
        dispatch(addComment(data), dispatch);
      }
    },
  });
  return (
    <form className="addcomment__form" onSubmit={formik.handleSubmit}>
      <div className="addcomment__form-items">
        <div className="signin-info">
          <label htmlFor="title" className="addcomment__form-labels">
            عنوان نظر
          </label>
          {formik.errors.title ? (
            <div className="addcomment__form-error">{formik.errors.title}</div>
          ) : null}
        </div>

        <input
          id="title"
          name="title"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
        />
      </div>
      <div className="addcomment__form-items">
        <div className="signin-info">
          <label htmlFor="review" className="addcomment__form-lables">
            متن نظر
          </label>
          {formik.errors.review ? (
            <div className="addcomment__form-error">{formik.errors.review}</div>
          ) : null}
        </div>
        <input
          id="review"
          name="review"
          type="text"
          className="addcomment__content"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.review}
        />
      </div>
      <div className="addcomment__form-items">
        <label htmlFor="recommend" className="addcomment__form-lables">
          آیا این محصول را پیشنهاد می‌کنید؟
        </label>
        <select
          id="recommend"
          name="recommend"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.recommend}
        >
          <option value="نظری ندارم">لطفاً یک گزینه را انتخاب کنید</option>
          <option value="توصیه می‌کنم">توصیه می‌کنم</option>
          <option value="توصیه نمی‌کنم">توصیه نمی‌کنم</option>
        </select>
        {formik.errors.recommend ? (
          <div className="addcomment__form-error">
            {formik.errors.recommend}
          </div>
        ) : null}
      </div>
      <div className="addcomment__form-items">
        <label htmlFor="rating" className="addcomment__form-lables">
          آیا این محصول را پیشنهاد می‌کنید؟
        </label>
        <select
          id="rating"
          name="rating"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.rating}
        >
          <option value="0">لطفاً یک گزینه را انتخاب کنید:</option>
          <option value="1">۱</option>
          <option value="2">۲</option>
          <option value="3">۳</option>
          <option value="4">۴</option>
          <option value="5">۵</option>
        </select>
        {formik.errors.rating ? (
          <div className="addcomment__form-error">{formik.errors.rating}</div>
        ) : null}
      </div>
      <button className="btn-add-comment" type="submit">
        ثبت دیدگاه
      </button>
    </form>
  );
};

export default Addcomment;
