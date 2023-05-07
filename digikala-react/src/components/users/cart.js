import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { addtocart, removefromcart } from "../../store/actions/users";

import { Small_Loader } from "../../utils/tools";

const Cart = () => {
  const users = useSelector((state) => state.users);
  const orders = useSelector((state) => state.users.orders);
  const dispatch = useDispatch();

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
  const calcBeforeDis = () => {
    if (orders) {
      let cartTotalPrice = 0;
      orders.map((el) => {
        cartTotalPrice =
          cartTotalPrice + el.productName.price * el.productCount;
      });
      return String(cartTotalPrice);
    }
  };
  const calcTotalDis = () => {
    if (orders) {
      let totalDis = 0;
      orders.map((el) => {
        if (el.productName.discount > 0) {
          totalDis =
            totalDis +
            (el.productName.price -
              (el.productName.price -
                el.productName.price * (el.productName.discount / 100))) *
              el.productCount;
        }
      });
      return String(totalDis);
    }
  };

  const addProduct = (id) => {
    dispatch(addtocart(id));
  };
  const removeProduct = (id) => {
    dispatch(removefromcart(id));
  };

  return (
    <>
      <Link className="react-link booking" to="/">
        خانه{" "}
      </Link>
      <div className="booking">
        {orders ? (
          <>
            <div className="booking__Items">
              {orders.map((product) => {
                return (
                  <div className="booking__item">
                    <div className="booking__imgbox">
                      <div className="booking__imgbox-specialoffer">
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
                          className="booking__imgbox-img"
                        />
                      </Link>
                    </div>
                    <div className="cart__details">
                      <p className="cart__details-name">
                        {product.productName.name}
                      </p>
                      <div className="cart__details-price">
                        <div className="cart__btn-div">
                          <div
                            className="addtocart cart__btn-atc"
                            onClick={() => addProduct(product.productName._id)}
                          >
                            +
                          </div>
                          <>
                            {users.loading ? (
                              <Small_Loader />
                            ) : (
                              <p>{`${new Intl.NumberFormat("fa-IR").format(
                                product.productCount
                              )}`}</p>
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
              })}
            </div>
            <div className="booking__thirdrow">
              <div className="booking__finalprice">
                <p className="booking__beforedis-text"> مبلغ قبل از تخفیف :</p>
                <p className="booking__beforedis-number">
                  {`${new Intl.NumberFormat("fa-IR").format(
                    calcBeforeDis()
                  )} تومان`}
                </p>
                <p className="booking__disamount-text"> سود شما از این خرید:</p>
                <p className="booking__disamount-number">
                  {`${new Intl.NumberFormat("fa-IR").format(
                    calcTotalDis()
                  )} تومان`}
                </p>
                <p className="booking__finalprice-text"> قابل پرداخت:</p>
                <p className="booking__finalprice-number">
                  {`${new Intl.NumberFormat("fa-IR").format(
                    calcCartPrice()
                  )} تومان`}
                </p>
                <button className="booking-btn"> نهایی کردن سبد خرید </button>
              </div>
            </div>
          </>
        ) : (
          <p className="empty-cart-text"> سبد خرید خالی است {"\n"} ☹️ </p>
        )}
      </div>
    </>
  );
};

export default Cart;
