import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import {
  clearNotification,
  globalSucces,
} from "../store/reducers/notifications";
import { ToastContainer } from "react-toastify";

import { showToast } from "../utils/tools";
import { Small_Loader } from "../utils/tools";
import { addtocart, removefromcart, signout } from "../store/actions/users";

const Header = () => {
  const notifications = useSelector((state) => state.notifications);
  const users = useSelector((state) => state.users);
  const orders = useSelector((state) => state.users.orders);
  const dispatch = useDispatch();

  let [profileModal, setProfileModal] = useState(false);
  let [screencover, setScreencover] = useState(false);
  let [cartModal, setCartModal] = useState(false);
  let [menuModal, setMenuModal] = useState(false);

  useEffect(() => {
    let { global } = notifications;

    if (notifications && global.error) {
      let msg = global.msg ? global.msg : "خطا!!!";

      showToast("ERROR", msg);
      dispatch(clearNotification());
    }
    if (notifications && global.success) {
      let msg = global.msg ? global.msg : "موفق";

      showToast("SUCCESS", msg);
      dispatch(clearNotification());
    }
  }, [notifications]);

  const showProfileModal = () => {
    setProfileModal(!profileModal);
    setScreencover(!screencover);
    setCartModal(false);
  };
  const showCartModal = () => {
    setProfileModal(false);
    setCartModal(true);
    setScreencover(true);
  };
  const setModalsOff = () => {
    setProfileModal(false);
    setCartModal(false);
    setScreencover(false);
  };

  const calcFinalPrice = (dis, price) => {
    if (dis > 0) {
      return price - price * (dis / 100);
    } else {
      return price;
    }
  };

  const calcCartPrice = () => {
    if (orders) {
      let cartFinalPrice = 0;
      orders.map((el) => {
        if (el.productName.discount > 0) {
          cartFinalPrice =
            cartFinalPrice +
            (el.productName.price -
              el.productName.price * (el.productName.discount / 100)) *
              el.productCount;
        } else {
          cartFinalPrice =
            cartFinalPrice + el.productName.price * el.productCount;
        }
      });
      return String(cartFinalPrice);
    }
  };

  const addProduct = (id) => {
    dispatch(addtocart(id));
  };
  const removeProduct = (id) => {
    dispatch(removefromcart(id));
  };
  const signmeout = () => {
    dispatch(globalSucces("با موفقیت خارج شدید"));
    dispatch(signout(dispatch));
  };
  return (
    <header className="header container">
      <div
        className={screencover ? "screencover" : "screencover-not"}
        onMouseOver={setModalsOff}
      ></div>
      <ToastContainer rtl></ToastContainer>
      <div className="header-desktop">
        <div className="header-desktop__right">
          <Link to="/" className="react-link">
            <svg className="icon-logo-en">
              <use xlinkHref="/svg-icons.svg#icon-logo-en"></use>
            </svg>
          </Link>
          <input
            className="search-bar"
            type="search"
            placeholder="جستجو"
            dir="rtl"
          />
        </div>
        <div className="header-desktop__left">
          {users.auth ? (
            <>
              <Link className="btn-profile" onClick={showProfileModal}>
                <svg className="svg-icon">
                  <use xlinkHref="/svg-icons.svg#icon-user"></use>
                </svg>
                <svg className="svg-icon">
                  <use xlinkHref="/svg-icons.svg#icon-keyboard_arrow_down"></use>
                </svg>
              </Link>
              <div
                className={profileModal ? "profile-modal" : "profile-modal-not"}
              >
                <Link to="/profile" className="profile-modal__name">
                  <p>{`${users.data.name} ${users.data.family}`}</p>
                  <svg className="svg-icon">
                    <use xlinkHref="/img/svg-icons.svg#icon-keyboard_arrow_left" />
                  </svg>
                </Link>
                <div onClick={signmeout} className="profile-modal__logout">
                  <p> خروج از حساب </p>
                  <svg className="svg-icon">
                    <use xlinkHref="/img/svg-icons.svg#icon-exit" />
                  </svg>
                </div>
              </div>
            </>
          ) : (
            <Link to="/signin" className="btn-signin">
              <svg className="svg-icon">
                <use xlinkHref="/svg-icons.svg#icon-enter"></use>
              </svg>
              <div>ورود | ثبت‌نام</div>
            </Link>
          )}

          {users.auth ? (
            <>
              <div className="btn-cart" onMouseOver={showCartModal}>
                {orders.length > 0 ? (
                  <p className="cart-quantity">{`${new Intl.NumberFormat(
                    "fa-IR"
                  ).format(orders.length)}`}</p>
                ) : null}
                <svg className="svg-icon">
                  <use xlinkHref="/svg-icons.svg#icon-cart"></use>
                </svg>
              </div>

              <div className={cartModal ? "cart-modal" : "cart-modal-not"}>
                {orders.length > 0 ? (
                  <>
                    <div className="cart__firsrow">
                      <p>{`${new Intl.NumberFormat("fa-IR").format(
                        orders.length
                      )} کالا`}</p>
                      <Link to="/cart"> مشاهدهٔ سبد خرید </Link>
                    </div>

                    <div className="cart__seconfrow">
                      {orders.map((product) => {
                        return (
                          <div className="cart__item">
                            <div className="cart__imgbox">
                              <div class="cart__imgbox-specialoffer">
                                <svg className="speciallsell-icon">
                                  {product.productName.discount > 0 ? (
                                    <use xlinkHref="/img/svg-icons.svg#icon-SpecialSell" />
                                  ) : (
                                    <use />
                                  )}
                                </svg>
                              </div>
                              <Link
                                className="cart__link"
                                to={`/product/${product.productName.slug}`}
                              >
                                <img
                                  src={`/img/${product.productName.type}/${product.productName.brandEnglish}/${product.productName.model}/image-4.jpg`}
                                  alt={`${product.productName.name}`}
                                  className="cart__imgbox-img"
                                />
                              </Link>
                            </div>
                            <div className="cart__details">
                              <p className="cart__details-name">
                                {" "}
                                {product.productName.name}
                              </p>
                              <div className="cart__details-price">
                                <div className="cart__btn-div">
                                  <div
                                    className="addtocart cart__btn-atc"
                                    onClick={() =>
                                      addProduct(product.productName._id)
                                    }
                                  >
                                    +
                                  </div>
                                  <>
                                    {users.loading ? (
                                      <Small_Loader />
                                    ) : (
                                      <p>{`${new Intl.NumberFormat(
                                        "fa-IR"
                                      ).format(product.productCount)}`}</p>
                                    )}
                                  </>
                                  {product.productCount === 1 ? (
                                    <div
                                      className="removefromcart cart__btn-atc"
                                      onClick={() =>
                                        removeProduct(product.productName._id)
                                      }
                                    >
                                      <svg className="icon-trash">
                                        <use xlinkHref="/img/svg-icons.svg#icon-trash" />
                                      </svg>
                                    </div>
                                  ) : (
                                    <div
                                      className="removefromcart cart__btn-atc"
                                      onClick={() =>
                                        removeProduct(product.productName._id)
                                      }
                                    >
                                      {" "}
                                      -{" "}
                                    </div>
                                  )}
                                </div>
                                <div className="cart__price-div">
                                  <p className="cart__details-price-final">{`${new Intl.NumberFormat(
                                    "fa-IR"
                                  ).format(
                                    calcFinalPrice(
                                      product.productName.discount,
                                      product.productName.price
                                    ) * product.productCount
                                  )}`}</p>
                                  {product.productName.discount > 0 ? (
                                    <p className="cart__details-before-price">{`${new Intl.NumberFormat(
                                      "fa-IR"
                                    ).format(
                                      (product.productName.price -
                                        calcFinalPrice(
                                          product.productName.discount,
                                          product.productName.price
                                        )) *
                                        product.productCount
                                    )} تومان تخفیف`}</p>
                                  ) : (
                                    <p></p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}{" "}
                    </div>

                    <div className="cart__thirdrow">
                      {orders ? (
                        <>
                          <div className="cart__finalprice">
                            <p className="cart__finalprice-text">
                              {" "}
                              قابل پرداخت:
                            </p>
                            <p className="cart__finalprice-number">{`${new Intl.NumberFormat(
                              "fa-IR"
                            ).format(calcCartPrice())}`}</p>
                          </div>
                          <Link className="cart__cta-btn" href="/cart">
                            {" "}
                            نهایی کردن سبد خرید{" "}
                          </Link>
                        </>
                      ) : null}
                    </div>
                  </>
                ) : (
                  <p className="empty-cart-text">
                    {" "}
                    سبد خرید خالی است {"\n"} ☹️{" "}
                  </p>
                )}
              </div>
            </>
          ) : (
            <Link className="react-link" to="/singin">
              <svg className="svg-icon">
                <use xlinkHref="/svg-icons.svg#icon-cart"></use>
              </svg>
            </Link>
          )}
        </div>
      </div>
      <div className="header-tablet">
        <>
          <div
            className={menuModal ? "screencover-menu" : "screencover-menu-not"}
            onClick={() => {
              setMenuModal(false);
            }}
          ></div>
          <section className={menuModal ? "sidebar sidebar-show" : "sidebar"}>
            <Link
              to="/"
              onClick={() => {
                setMenuModal(false);
              }}
              className="sidebar__item"
            >
              <p>خانه</p>
              <svg className="svg-icon">
                <use xlinkHref="/svg-icons.svg#icon-home"></use>
              </svg>
            </Link>
            {users.auth ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => {
                    setMenuModal(false);
                  }}
                  className="sidebar__item"
                >
                  <p>پروفایل کاربری</p>
                  <svg className="svg-icon">
                    <use xlinkHref="/svg-icons.svg#icon-user"></use>
                  </svg>
                </Link>
                <Link
                  to="/cart"
                  onClick={() => {
                    setMenuModal(false);
                  }}
                  className="sidebar__item"
                >
                  <p>سبد خرید</p>
                  <svg className="svg-icon">
                    <use xlinkHref="/svg-icons.svg#icon-cart"></use>
                  </svg>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  onClick={() => {
                    setMenuModal(false);
                  }}
                  className="sidebar__item"
                >
                  <p>ورود</p>
                  <svg className="svg-icon">
                    <use xlinkHref="/svg-icons.svg#icon-enter"></use>
                  </svg>
                </Link>
                <Link
                  to="/signup"
                  onClick={() => {
                    setMenuModal(false);
                  }}
                  className="sidebar__item"
                >
                  <p>ثبت‌نام</p>
                  <svg className="svg-icon">
                    <use xlinkHref="/svg-icons.svg#icon-clipboard"></use>
                  </svg>
                </Link>
              </>
            )}

            <Link
              to="/about"
              onClick={() => {
                setMenuModal(false);
              }}
              className="sidebar__item"
            >
              <p>درباره</p>
              <svg className="svg-icon">
                <use xlinkHref="/svg-icons.svg#icon-info"></use>
              </svg>
            </Link>
            <Link
              onClick={() => {
                setMenuModal(false);
              }}
              className="sidebar__item"
            >
              <p>بستن منو</p>
              <svg className="svg-icon">
                <use xlinkHref="/svg-icons.svg#icon-clear"></use>
              </svg>
            </Link>
          </section>
        </>
        <svg
          onClick={() => {
            setMenuModal(true);
          }}
          className="svg-icon"
        >
          <use xlinkHref="/svg-icons.svg#icon-menu"></use>
        </svg>
        <Link to="/" className="react-link">
          <svg className="icon-logo-en">
            <use xlinkHref="/svg-icons.svg#icon-logo-en"></use>
          </svg>
        </Link>
        {users.auth ? (
          <>
            <Link to="/cart" className="btn-cart">
              {orders.length > 0 ? (
                <p className="cart-quantity">{`${new Intl.NumberFormat(
                  "fa-IR"
                ).format(orders.length)}`}</p>
              ) : null}
              <svg className="svg-icon">
                <use xlinkHref="/svg-icons.svg#icon-cart"></use>
              </svg>
            </Link>
          </>
        ) : (
          <svg className="svg-icon">
            <use xlinkHref="/svg-icons.svg#icon-cart"></use>
          </svg>
        )}
      </div>
    </header>
  );
};

export default Header;
