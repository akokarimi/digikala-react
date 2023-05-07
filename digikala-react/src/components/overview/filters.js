import { useRef, useEffect, useState } from "react";

const Filters = () => {
  return (
    <>
      <section className="filters">
        <div className="filters__title">
          <div className="filters__title-closeicon">
            <svg className="icon-clear">
              <use xlinkHref="img/svg-icons.svg#icon-clear"></use>
            </svg>
          </div>

          <p className="filters__title-text">فیلترها</p>
        </div>
        <div className="filters__item">
          <p>برند</p>

          <input
            type="checkbox"
            className="filter_checkbox"
            id="brands-toggle"
          />
          <label className="toggle-icon--brands">
            <svg className="toggle-icon">
              <use xlinkHref="img/svg-icons.svg#icon-keyboard_arrow_down"></use>
            </svg>
          </label>
          <div className="filters__brands">
            <div className="filters__brands-item">
              <input
                type="checkbox"
                className="filters__brands-item-checkbox"
                id="brand-k22"
              />
              <label className="filters__brands-item-label">
                <p>کی۲۲</p>
                <p>K22</p>
              </label>
            </div>
            <div className="filters__brands-item">
              <input
                type="checkbox"
                className="filters__brands-item-checkbox"
                id="brand-samsung"
              />
              <label className="filters__brands-item-label">
                <p>سامسونگ</p>
                <p>Samsung</p>
              </label>
            </div>
          </div>
        </div>
        <div className="filters__item">
          <p>قیمت</p>
          <input
            type="checkbox"
            className="filter_checkbox"
            id="price-toggle"
          />
          <label className="toggle-icon--price">
            <svg className="toggle-icon">
              <use xlinkHref="img/svg-icons.svg#icon-keyboard_arrow_down"></use>
            </svg>
          </label>
        </div>
      </section>
    </>
  );
};

export default Filters;
