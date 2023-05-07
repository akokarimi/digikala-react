import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getAllProducts } from "../../store/actions/products";

import Filters from "./filters";
import Sorting_Desktop from "./sorting-desktop";
import Sorting_Tablet from "./sorting-tablet";
import { Loader } from "../../utils/tools";

const Overview = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1025px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const location = useLocation();

  let [loaded, setLoaded] = useState(false);

  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  useEffect(() => {
    const query = String(location.search);
    dispatch(getAllProducts(query));
  }, [""]);

  const sortProducts = (query) => {
    dispatch(getAllProducts(query));
  };

  useEffect(() => {
    if (products.status !== "success") setLoaded(false);
    if (products.status === "success") setLoaded(true);
  }, [products]);

  return (
    <>
      {!loaded || !products.data ? (
        <Loader />
      ) : (
        <main className="main__overview container">
          {isDesktop && <Filters />}
          <section className="content">
            <div className="content__sorting">
              {isDesktop && <Sorting_Desktop sortProducts={sortProducts} />}
              {isTablet && <Sorting_Tablet sortProducts={sortProducts} />}
            </div>
            <div className="content__products">
              {products.data.map((product) => {
                return (
                  <Link
                    to={`/${product._id}`}
                    className="react-link"
                    key={product._id}
                  >
                    <div className="content__products-card">
                      <div className="content__products-card-imgbox">
                        <div className="content__products-card-imgbox-specialoffer">
                          {product.discount > 0 ? (
                            <svg className="speciallsell-icon">
                              <use xlinkHref="img/svg-icons.svg#icon-SpecialSell"></use>
                            </svg>
                          ) : null}
                        </div>
                        <div>
                          <img
                            src={`/img/${product.type}/${product.brandEnglish}/${product.model}/image-4.jpg`}
                            alt={product.name}
                            className="content__products-card-imgbox-img"
                          />
                        </div>
                      </div>
                      <div className="content__products-card-details">
                        <p className="content__products-card-details-name">
                          {product.name}
                        </p>
                        <div className="content__products-card-details-score">
                          <p>{product.rating}</p>
                          <svg className="score-icon">
                            <use xlinkHref="img/svg-icons.svg#icon-star-full"></use>
                          </svg>
                        </div>
                        <div className="content__products-card-details-price">
                          <p
                            className={
                              product.discount > 0
                                ? "content__products-card-details-price-discount"
                                : ""
                            }
                          >
                            {product.discount > 0
                              ? `${
                                  new Intl.NumberFormat("fa-IR").format(
                                    product.discount
                                  ) + "٪"
                                }`
                              : null}
                          </p>
                          <p className="content__products-card-details-price-final">
                            {product.discount > 0
                              ? new Intl.NumberFormat("fa-IR").format(
                                  product.price -
                                    product.price * (product.discount / 100)
                                )
                              : new Intl.NumberFormat("fa-IR").format(
                                  product.price
                                )}
                          </p>
                        </div>
                        <p className="content__products-card-details-before-price">
                          {product.discount > 0
                            ? new Intl.NumberFormat("fa-IR").format(
                                product.price
                              )
                            : null}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        </main>
      )}
    </>
  );
};

export default Overview;
