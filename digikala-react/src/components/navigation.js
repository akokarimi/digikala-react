import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navigation = () => {
  const users = useSelector((state) => state.users);

  const underline = useRef();
  const menuZeroItem = useRef();
  let [menuModal, setMenuModal] = useState(false);

  const mouseEnter = function (e) {
    const pointZero = menuZeroItem.current.getBoundingClientRect().left;
    const coords = e.target.getBoundingClientRect().left - pointZero;
    if (
      e.target.className &&
      String(e.target.className).includes("navigationd__right-item")
    ) {
      underline.current.style.width = `${
        e.target.getBoundingClientRect().width
      }px`;
      underline.current.style.transform = `translateX(${coords}px)`;
    }
  };

  const mouseLeave = function (e) {
    underline.current.style.width = "0px";
  };

  return (
    <>
      <nav className="navigation container">
        <div className="navigationd">
          <div className="navigationd__right">
            <ul
              onPointerMove={mouseEnter}
              onPointerLeave={mouseLeave}
              className="navigationd__right-list"
            >
              <li
                className="navigationd__right-item navigationd__right-menu"
                ref={menuZeroItem}
                onClick={() => {
                  setMenuModal(true);
                }}
              >
                <div className="under-line" ref={underline}></div>
                <svg className="svg-icon">
                  <use xlinkHref="/svg-icons.svg#icon-menu"></use>
                </svg>
                <a href="#">منوی دسترسی</a>
              </li>
              <>
                <div
                  className={
                    menuModal ? "screencover-menu" : "screencover-menu-not"
                  }
                  onClick={() => {
                    setMenuModal(false);
                  }}
                ></div>
                <section
                  className={menuModal ? "sidebar sidebar-show" : "sidebar"}
                >
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
              <li className="navigationd__right-item">
                <a href="#">سوپرمارکت</a>
              </li>
              <li className="navigationd__right-item">
                <svg className="nav-icon">
                  <use xlinkHref="/svg-icons.svg#icon-fire"></use>
                </svg>
                <a href="#"> پرفروش‌ترین‌ها </a>
              </li>
              <li className="navigationd__right-item">
                <svg className="nav-icon">
                  <use xlinkHref="/svg-icons.svg#icon-discout"></use>
                </svg>
                <a href="#"> تخفیف‌ها و پیشنهادها</a>
              </li>
              <li className="navigationd__right-item">
                <a href="#">!شگفت‌انگیزها</a>
              </li>
              <li className="navigationd__right-item">
                <a href="#">سوالی دارید؟</a>
              </li>
              <li className="navigationd__right-item">
                <a href="#">در دیجی‌کالا بفروشید!</a>
              </li>
            </ul>
          </div>
          <div className="navigationd__left">
            <a href="#" className="btn-enter-location">
              لطفا شهر خود را انتخاب کنید
            </a>
            <svg className="svg-icon">
              <use xlinkHref="/svg-icons.svg#icon-location1"></use>
            </svg>
          </div>
        </div>
        <div className="navigationt">
          <input
            className="search-bar-tablet"
            type="search"
            placeholder="جستجو"
            dir="rtl"
          />
          <>
            {users.auth ? (
              <Link to="/profile" className="btn-profile">
                <svg className="svg-icon">
                  <use xlinkHref="/svg-icons.svg#icon-user"></use>
                </svg>
              </Link>
            ) : (
              <Link to="/signin" className="btn-signin">
                <svg className="svg-icon">
                  <use xlinkHref="/svg-icons.svg#icon-enter"></use>
                </svg>
                <div>ورود</div>
              </Link>
            )}
          </>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
