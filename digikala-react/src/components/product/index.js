import { useRef, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getProduct } from "../../store/actions/products";

import Comments from "./comments";
import Addcomment from "./addcomment";
import Button_CTA from "./btn_cta";
import { Loader } from "../../utils/tools";

const Product = () => {
  const params = useParams();

  let [loading, setLoading] = useState(true);

  const product = useSelector((state) => state.products.product);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    dispatch(getProduct(params.productId));
  }, [""]);

  useEffect(() => {
    if (product.status !== "success") setLoading(true);
    if (product.status === "success") setLoading(false);
  }, [product]);

  ////change main image
  const mainImageBox = useRef();
  const hoverbox = useRef();
  const zoomBox = useRef();
  const zoomImg = useRef();

  const changeMainImg = (e) => {
    mainImageBox.current.setAttribute("src", e.target.getAttribute("src"));
    zoomImg.current.setAttribute("src", e.target.getAttribute("src"));
  };
  /////hover zoom

  const mouseEntered = (e) => {
    if (window.innerWidth > 1024) {
      hoverbox.current.style.display = "block";
      zoomBox.current.style.display = "block";
      hoverbox.current.style.left = `${e.pageX}px`;
      hoverbox.current.style.top = `${e.pageY}px`;
      hoverbox.current.style.width = window.getComputedStyle(
        mainImageBox.current
      ).width;
    }
  };

  const hover = (e) => {
    if (window.innerWidth > 1024) {
      hoverbox.current.style.left = `${e.pageX}px`;
      hoverbox.current.style.top = `${e.pageY}px`;
      zoomImg.current.style.transform = `translateX(${
        mainImageBox.current.getBoundingClientRect().right - e.pageX
      }px)`;
      zoomImg.current.style.transform = `translateY(${
        mainImageBox.current.getBoundingClientRect().top - e.pageY
      }px)`;
      if (
        e.pageX >= mainImageBox.current.getBoundingClientRect().right ||
        e.pageX <= mainImageBox.current.getBoundingClientRect().left ||
        e.pageY >= mainImageBox.current.getBoundingClientRect().bottom ||
        e.pageY <= mainImageBox.current.getBoundingClientRect().top
      ) {
        hoverbox.current.style.display = "none";
        zoomBox.current.style.display = "none";

        return;
      }
    }
  };

  return (
    <>
      {loading || !product.data ? (
        <Loader />
      ) : (
        <>
          <main className="container">
            <section className="section__directory container">
              <ul>
                <li>
                  <a href="#" className="section__directory-items">
                    دیجی‌کالا{" "}
                  </a>
                </li>
                <li>/</li>
                <li>
                  <a href="#" className="section__directory-items">
                    کالای دیجیتال
                  </a>
                </li>
                <li>/</li>
                <li>
                  <a href="#" className="section__directory-items">
                    ساعت هوشمند
                  </a>
                </li>
              </ul>
            </section>
            <section className="product container">
              <div className="product__image">
                <div className="product__image-top">
                  <ul className="product__image-top-sidebar">
                    <li>
                      <svg className="special-sell-icon">
                        <use xlinkHref="img/svg-icons.svg#icon-SpecialSell"></use>
                      </svg>
                    </li>
                    <li>
                      <svg className="svg-icon">
                        <use xlinkHref="img/svg-icons.svg#icon-heart-o"></use>
                      </svg>
                    </li>
                    <li>
                      <svg className="svg-icon">
                        <use xlinkHref="img/svg-icons.svg#icon-share2"></use>
                      </svg>
                    </li>
                    <li>
                      <svg className="svg-icon">
                        <use xlinkHref="img/svg-icons.svg#icon-bell-o"></use>
                      </svg>
                    </li>
                    <li>
                      <svg className="svg-icon">
                        <use xlinkHref="img/svg-icons.svg#icon-stats-dots"></use>
                      </svg>
                    </li>
                    <li>
                      <svg className="svg-icon">
                        <use xlinkHref="img/svg-icons.svg#icon-compare"></use>
                      </svg>
                    </li>
                  </ul>
                  <div className="product__mainimagebox">
                    <img
                      className="product__image-top-main"
                      src={`/img/${product.data.type}/${product.data.brandEnglish}/${product.data.model}/image-4.jpg`}
                      alt="watch"
                      ref={mainImageBox}
                      onMouseEnter={mouseEntered}
                    />
                    <div
                      className="hoverzoom-hoverbox"
                      ref={hoverbox}
                      onPointerMoveCapture={hover}
                    ></div>
                  </div>
                </div>
                <div className="product__image-bottom">
                  <div
                    className="product__image-bottom-small"
                    onClick={changeMainImg}
                  >
                    <img
                      className="product__smallimages"
                      src={`/img/${product.data.type}/${product.data.brandEnglish}/${product.data.model}/image-1.jpg`}
                      alt="watch"
                    />
                    <img
                      className="product__smallimages"
                      src={`/img/${product.data.type}/${product.data.brandEnglish}/${product.data.model}/image-2.jpg`}
                      alt="watch"
                    />
                    <img
                      className="product__smallimages"
                      src={`/img/${product.data.type}/${product.data.brandEnglish}/${product.data.model}/image-3.jpg`}
                      alt="watch"
                    />
                    <img
                      className="product__smallimages"
                      src={`/img/${product.data.type}/${product.data.brandEnglish}/${product.data.model}/image-4.jpg`}
                      alt="watch"
                    />
                    <img
                      className="product__smallimages"
                      src={`/img/${product.data.type}/${product.data.brandEnglish}/${product.data.model}/image-5.jpg`}
                      alt="watch"
                    />
                  </div>
                  <div className="product__image-bottom-report">
                    <div className="">
                      <p>
                        <ion-icon
                          name="alert-circle-outline"
                          className="ion-icon"
                        ></ion-icon>
                      </p>
                      <p>گزارش نادرستی مشخصات</p>
                    </div>
                    <div>
                      <p>DKP-6480712</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="product__details">
                <div className="hoverzoom-box" ref={zoomBox}>
                  <img
                    className="hoverzoom-img"
                    src={`/img/${product.data.type}/${product.data.brandEnglish}/${product.data.model}/image-4.jpg`}
                    ref={zoomImg}
                  />
                </div>
                <h1 className="product__details-name">{product.data.name}</h1>
                <div className="product__details-scoring">
                  <svg className="score-icon">
                    <use xlinkHref="img/svg-icons.svg#icon-star-full"></use>
                  </svg>
                  <p>
                    {new Intl.NumberFormat("fa-IR").format(
                      product.data.ratingsAverage
                    )}
                  </p>
                  <p className="product__details-scoring-usercount">{`(${new Intl.NumberFormat(
                    "fa-IR"
                  ).format(product.data.ratingsQuantity)})`}</p>
                  <span>&#x2022;</span>
                  <a href="#">{`${
                    product.data.reviews
                      ? new Intl.NumberFormat("fa-IR").format(
                          product.data.reviews.length
                        )
                      : "۰"
                  } دیدگاه`}</a>
                </div>

                <div className="product__details-reviews">
                  <svg className="like-icon">
                    <use xlinkHref="img/svg-icons.svg#icon-like"></use>
                  </svg>
                  <p>۸۱٪ (۱۳۰ نفر) از کاربران، این کالا را پیشنهاد کرده‌اند</p>
                </div>

                <h2 className="product__details-colorname">رنگ: مشکی</h2>

                <div className="product__details-colorcircles">
                  <p className="product__details-colorcircles-black">&nbsp;</p>
                  <p className="product__details-colorcircles-green">&nbsp;</p>
                </div>

                <div className="product__details-features" dir="rtl">
                  <p>ویژگی‌ها:</p>

                  <ul>
                    <li>
                      نوع کاربری &nbsp; : &nbsp;<span>روزمره، ورزشی</span>
                    </li>
                    <li>
                      فرم صفحه &nbsp; : &nbsp;<span>گرد</span>
                    </li>
                    <li>
                      جنس بند &nbsp; : &nbsp;<span>سیلیکون</span>
                    </li>
                  </ul>
                </div>

                <div className="product__details-returncondition">
                  <svg className="svg-icon">
                    <use xlinkHref="img/svg-icons.svg#icon-exclamation-outline"></use>
                  </svg>
                  <p>
                    درخواست مرجوع کردن کالا در گروه ساعت هوشمند با دلیل "انصراف
                    از خرید" تنها در صورتی قابل تایید است که کالا در شرایط اولیه
                    باشد (در صورت پلمپ بودن، کالا نباید باز شده باشد).
                  </p>
                </div>

                <div className="product__details-digiplus">
                  <p className="product__details-digiplus-title">
                    ارسال <strong>رایگان</strong> سفارش‌ها برای اعضای دیجی‌پلاس
                  </p>

                  <p className="product__details-digiplus-message">
                    ۲۹ هزارتومان هزینه ارسال به سراسر ایران برای کاربران غیر
                    دیجی‌پلاس
                  </p>
                </div>

                <div className="product__details-digiplus">
                  <p className="product__details-digiplus-title">
                    ویژه اعضای دیجی‌پلاس
                  </p>

                  <ul className="product__details-digiplus-list">
                    <li>ارسال رایگان</li>
                    <li>امکان ارسال فوری (شهر تهران)</li>
                  </ul>
                </div>
              </div>
              <div className="product__seller">
                <div className="sellercard">
                  <div className="sellercard-title">
                    <h2>فروشنده</h2>
                  </div>

                  <div className="sellercard-info">
                    <svg className="svg-icon">
                      <use xlinkHref="img/svg-icons.svg#icon-shop"></use>
                    </svg>
                    <p className="sellercard-name">بازرگانی آرکا</p>
                    <p>&nbsp;</p>

                    <div className="sellercard-rating">
                      <a href="#" className="sellercard-rating-satisfaction">
                        ۸۷.۴٪
                      </a>
                      <p>رضایت از کالا</p>
                      <p>|</p>
                      <p>عملکرد</p>
                      <a href="#" className="sellercard-rating-satisfaction">
                        عالی
                      </a>
                    </div>
                  </div>

                  <div className="sellercard-dividerline"></div>

                  <div className="sellercard-guarantee">
                    <svg className="svg-icon">
                      <use xlinkHref="img/svg-icons.svg#icon-lock"></use>
                    </svg>
                    <p className="sellercard-guarantee-note">
                      گارانتی اصالت و سلامت فیزیکی کالا
                    </p>
                  </div>

                  <div className="sellercard-dividerline"></div>

                  <div className="sellercard-availability">
                    <svg className="available-icon">
                      <use xlinkHref="img/svg-icons.svg#icon-shopping-bag"></use>
                    </svg>
                    <h2 className="sellercard-availability-status">
                      موجود در انبار دیجی‌کالا
                    </h2>
                    <div></div>

                    <div className="sellercard-shipping">
                      <svg className="icon-truck">
                        <use xlinkHref="img/svg-icons.svg#icon-truck"></use>
                      </svg>
                      <p>ارسال دیجی‌کالا</p>
                    </div>
                  </div>

                  <div className="sellercard-dividerline"></div>

                  <div className="sellercard-pricing">
                    <p className="sellercard-pricing-title">قیمت فروشنده:</p>
                    {product.data.discount > 0 ? (
                      <div className="sellercard-pricing-numbers">
                        <div className="sellercard-pricing-beforedis">
                          <p className="sellercard-pricing-crossedprice">
                            {`${new Intl.NumberFormat("fa-IR").format(
                              product.data.price
                            )}`}
                          </p>
                          <p className="sellercard-pricing-discountrate">{`${new Intl.NumberFormat(
                            "fa-IR"
                          ).format(product.data.discount)}٪`}</p>
                        </div>
                        <div>
                          <p className="sellercard-pricing-finalprice">
                            {`${new Intl.NumberFormat("fa-IR").format(
                              product.data.price -
                                product.data.price *
                                  (product.data.discount / 100)
                            )}`}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="sellercard-pricing-numbers">
                        <p className="sellercard-pricing-finalprice">
                          {`${new Intl.NumberFormat("fa-IR").format(
                            product.data.price
                          )}`}
                        </p>
                      </div>
                    )}

                    <Button_CTA productId={product.data._id} />
                  </div>
                </div>
              </div>
            </section>
          </main>
          <Comments />
          <Addcomment productId={product.data._id} />
        </>
      )}
    </>
  );
};

export default Product;
