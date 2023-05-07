import { useSelector } from "react-redux";

const Sorting_Desktop = ({ sortProducts }) => {
  const products = useSelector((state) => state.products.products);

  return (
    <>
      <ul className="content__sorting-desktop-list">
        <li className="content__sorting-desktop-item content__sorting-desktop-title">
          <svg className="svg-icon">
            <use xlinkHref="img/svg-icons.svg#icon-sort-amount-desc"></use>
          </svg>
          <p href="#">مرتب‌سازی:</p>
          <svg className="svg-icon content__sorting-desktop-title-closeicon">
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

      <p className="content__sorting-sumnum">۸ کالا</p>
    </>
  );
};

export default Sorting_Desktop;
