import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addtocart, removefromcart } from "../../store/actions/users";

import { Small_Loader } from "../../utils/tools";

const Button_CTA = ({ productId }) => {
  const users = useSelector((state) => state.users);
  const orders = useSelector((state) => state.users.orders);
  const dispatch = useDispatch();

  let [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    setOrderCount(0);
    if (orders) {
      orders.map((order) => {
        if (order.productName._id === productId) {
          return setOrderCount(order.productCount);
        }
      });
    }
  }, []);

  useEffect(() => {
    setOrderCount(0);
    if (orders) {
      orders.map((order) => {
        if (order.productName._id === productId) {
          return setOrderCount(order.productCount);
        }
      });
    }
  }, [orders]);

  const addProduct = (id) => {
    dispatch(addtocart(id));
  };
  const removeProduct = (id) => {
    dispatch(removefromcart(id));
  };

  return (
    <>
      {users.auth ? (
        <>
          {orderCount !== 0 ? (
            <div className="card__btn-div">
              <div
                className="addtocart cart__btn-atc"
                onClick={() => addProduct(productId)}
              >
                +
              </div>
              <>
                {users.loading ? (
                  <Small_Loader />
                ) : (
                  <p>{`${new Intl.NumberFormat("fa-IR").format(
                    orderCount
                  )}`}</p>
                )}
              </>
              {orderCount === 1 ? (
                <div
                  className="removefromcart cart__btn-atc"
                  onClick={() => removeProduct(productId)}
                >
                  <svg className="icon-trash">
                    <use xlinkHref="/img/svg-icons.svg#icon-trash" />
                  </svg>
                </div>
              ) : (
                <div
                  className="removefromcart cart__btn-atc"
                  onClick={() => removeProduct(productId)}
                >
                  {" "}
                  -{" "}
                </div>
              )}
            </div>
          ) : (
            <button className="btn-cta" onClick={() => addProduct(productId)}>
              {users.loading ? <Small_Loader /> : "افزودن به سبد خرید"}
            </button>
          )}
        </>
      ) : (
        <Link to="/signin" className="btn-cta">
          افزودن به سبد خرید
        </Link>
      )}
    </>
  );
};

export default Button_CTA;
