const Footer = () => {
  return (
    <footer className="footer container">
      <div className="footer__firstrow">
        <div className="footer__firstrow-right">
          <svg className="icon-logo-en">
            <use xlinkHref="img/svg-icons.svg#main-icon-farsi"></use>
          </svg>
          <p>
            تلفن پشتیبانی ۶۱۹۳۰۰۰۰ - ۰۲۱ | ۷ روز هفته، ۲۴ ساعته پاسخگوی شما
            هستیم
          </p>
        </div>
      </div>
      <div className="footer__secondrow">
        <div className="footer__secondrow-items">
          <svg className="icon-features">
            <use xlinkHref="img/svg-icons.svg#icon-express-delivery"></use>
          </svg>
          <p>امکان تحویل سریع</p>
        </div>
        <div className="footer__secondrow-items">
          <svg className="icon-features">
            <use xlinkHref="img/svg-icons.svg#icon-support"></use>
          </svg>
          <p>۲۴ ساعته، ۷ روز هفته</p>
        </div>
        <div className="footer__secondrow-items">
          <svg className="icon-features">
            <use xlinkHref="img/svg-icons.svg#icon-cash-on-delivery"></use>
          </svg>
          <p>امکان پرداخت در محل</p>
        </div>

        <div className="footer__secondrow-items">
          <svg className="icon-features">
            <use xlinkHref="img/svg-icons.svg#icon-days-return"></use>
          </svg>
          <p>هفت روز زمانت بازگشت</p>
        </div>
        <div className="footer__secondrow-items">
          <svg className="icon-features">
            <use xlinkHref="img/svg-icons.svg#icon-original-products"></use>
          </svg>
          <p>ضمانت اصل بودن کالاها</p>
        </div>
      </div>
      <div className="footer__thirdrow">
        <ul className="footer__thirdrow-column">
          <li className="footer__thirdrow-column-items">
            <p>با دیجی‌کالا</p>
          </li>
          <li className="footer__thirdrow-column-items">
            <a href="#">اتاق خبر در دیجی‌کالا</a>
          </li>
          <li className="footer__thirdrow-column-items">
            <a href="#">فروش در دیجی‌کالا</a>
          </li>
          <li className="footer__thirdrow-column-items">
            <a href="#">فرصت‌های شغلی</a>
          </li>
          <li className="footer__thirdrow-column-items">
            <a href="#">گزارش تخلف در دیجی‌کالا</a>
          </li>
          <li className="footer__thirdrow-column-items">
            <a href="#">تماس با دیجی‌کالا</a>
          </li>
        </ul>

        <ul className="footer__thirdrow-column">
          <li className="footer__thirdrow-column-items">
            <p>خدمات مشتریان</p>
          </li>
          <li className="footer__thirdrow-column-items">
            <a href="#">پاسخ به پرسش‌های متداول</a>
          </li>
          <li className="footer__thirdrow-column-items">
            <a href="#">رویه‌های بازگرداندن کالا</a>
          </li>
          <li className="footer__thirdrow-column-items">
            <a href="#">شرایط استفاده</a>
          </li>
          <li className="footer__thirdrow-column-items">
            <a href="#">حریم خصوصی</a>
          </li>
          <li className="footer__thirdrow-column-items">
            <a href="#">گزارش باگ</a>
          </li>
        </ul>

        <ul className="footer__thirdrow-column">
          <li className="footer__thirdrow-column-items">
            <p>راهنمای خرید از دیجی‌کالا</p>
          </li>
          <li className="footer__thirdrow-column-items">
            <a href="#">نحوه ثبت سفارش</a>
          </li>
          <li className="footer__thirdrow-column-items">
            <a href="#">رویه ارسال سفارش</a>
          </li>
          <li className="footer__thirdrow-column-items">
            <a href="#">شیوه‌های پرداخت</a>
          </li>
        </ul>

        <div className="footer__thirdrow-4thcolumn">
          <div className="footer__thirdrow-4thcolumn">
            <div className="footer__thirdrow-4thcolumn-top">همراه ما باشید</div>
            <div className="footer__thirdrow-4thcolumn-bottom">
              <svg className="icon-social">
                <use xlinkHref="img/svg-icons.svg#icon-instagram"></use>
              </svg>
              <svg className="icon-social">
                <use xlinkHref="img/svg-icons.svg#icon-twitter"></use>
              </svg>
              <svg className="icon-social">
                <use xlinkHref="img/svg-icons.svg#icon-linkedin2"></use>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
