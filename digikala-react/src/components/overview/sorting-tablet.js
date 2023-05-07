import { useState } from "react";
import { useSelector } from "react-redux";

const Sorting_Tablet = ({ sortProducts }) => {
  let [sortingIsShown, setSortingIsShown] = useState(false);
  let [filtersIsShown, setFiltersIsShown] = useState(false);

  const products = useSelector((state) => state.products.products);

  return (
    <>
      <ul className="content__sorting-tablet-list">
        <li
          onClick={() => setFiltersIsShown(true)}
          className="content__sorting-tablet-item filters-openicon"
        >
          <svg className="svg-icon">
            <use xlinkHref="img/svg-icons.svg#icon-equalizer"></use>
          </svg>
          <p href="#">فیلترها</p>
        </li>
        <li
          onClick={() => setSortingIsShown(true)}
          className="content__sorting-tablet-item sorting-openicon"
        >
          <svg className="svg-icon">
            <use xlinkHref="img/svg-icons.svg#icon-sort-amount-desc"></use>
          </svg>
          <a href="#">مرتب‌سازی:</a>
          <p>{products.homeSort}</p>
        </li>
      </ul>
      <p className="content__sorting-sumnum">۸ کالا</p>
      <ul
        className={
          !sortingIsShown
            ? "content__sorting-modal content__sorting-modal-hide"
            : "content__sorting-modal"
        }
      >
        <li className="content__sorting-desktop-item content__sorting-modal-title">
          <svg className="svg-icon">
            <use xlinkHref="img/svg-icons.svg#icon-sort-amount-desc"></use>
          </svg>
          <p href="#">مرتب‌سازی:</p>
          <svg
            onClick={() => setSortingIsShown(false)}
            className="svg-icon content__sorting-desktop-title-closeicon"
          >
            <use xlinkHref="img/svg-icons.svg#icon-clear"></use>
          </svg>
        </li>
        <li
          onClick={() => {
            sortProducts("/?sort=-createdAt");
          }}
          className="content__sorting-desktop-item"
        >
          <div>جدیدترین</div>
          <span>{products.homeSort === "جدیدترین" ? "✔️" : ""}</span>
        </li>
        <li
          onClick={() => {
            sortProducts("/?sort=price");
          }}
          className="content__sorting-desktop-item"
        >
          <div>ارزان‌ترین</div>
          <span>{products.homeSort === "ارزان‌ترین" ? "✔️" : ""}</span>
        </li>
        <li
          onClick={() => {
            sortProducts("/?sort=-price");
          }}
          className="content__sorting-desktop-item"
        >
          <div>گران‌ترین</div>
          <span>{products.homeSort === "گران‌ترین" ? "✔️" : ""}</span>
        </li>
        <li
          onClick={() => {
            sortProducts("/?sort=-ratingsAverage");
          }}
          className="content__sorting-desktop-item"
        >
          <div>بیشترین امتیاز</div>
          <span>{products.homeSort === "بیشترین امتیاز" ? "✔️" : ""}</span>
        </li>
        <li
          onClick={() => {
            sortProducts("?discount[gt]=0");
          }}
          className="content__sorting-desktop-item"
        >
          <div>شگفت‌انگیزها</div>
          <span>{products.homeSort === "شگفت‌انگیزها" ? "✔️" : ""}</span>
        </li>
      </ul>
      <section
        className={
          !filtersIsShown
            ? "filters__tablet filters__tablet-hide"
            : "filters__tablet"
        }
      >
        <div className="filters__title">
          <div
            onClick={() => setFiltersIsShown(false)}
            className="filters__title-closeicon"
          >
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
      </section>
    </>
  );
};
export default Sorting_Tablet;
