const About = () => {
  return (
    <main className="about container">
      <p className="about__title">
        این وبسایت صرفاً یک پروژهٔ تمرینی است و هیچ کاربرد دیگری ندارد. تمامی
        حقوق محفوظ است.
      </p>
      <div className="about__info">
        <div className="about__items">
          <p>طراح:</p>
          <span>آکو کریمی</span>
        </div>
        <div className="about__items">
          <p>آدرس ایمیل:</p>
          <span>ako.karimii@gmail.com</span>
        </div>
        <div className="about__items">
          <p>زبان‌ها و پلتفرم‌های مورد استفاده در طراحی وبسایت:</p>
        </div>
      </div>
      <div className="about__icons" dir="ltr">
        <div className="about__icons-items">
          <svg className="about-icons">
            <use xlinkHref="/svg-icons.svg#html5"></use>
          </svg>
          <p>HTML5</p>
        </div>
        <div className="about__icons-items">
          <svg className="about-icons">
            <use xlinkHref="/svg-icons.svg#css3"></use>
          </svg>
          <p>CSS3</p>
        </div>
        <div className="about__icons-items">
          <svg className="about-icons">
            <use xlinkHref="/svg-icons.svg#sass"></use>
          </svg>
          <p>Sass</p>
        </div>
        <div className="about__icons-items">
          <svg className="about-icons">
            <use xlinkHref="/svg-icons.svg#javascript"></use>
          </svg>
          <p>JavaScript</p>
        </div>
        <div className="about__icons-items">
          <svg className="about-icons">
            <use xlinkHref="/svg-icons.svg#react"></use>
          </svg>
          <p>React</p>
        </div>
        <div className="about__icons-items">
          <svg className="about-icons">
            <use xlinkHref="/svg-icons.svg#nodejs"></use>
          </svg>
          <p>Nodejs</p>
        </div>
        <div className="about__icons-items">
          <svg className="about-icons">
            <use xlinkHref="/svg-icons.svg#express"></use>
          </svg>
          <p>Express</p>
        </div>
        <div className="about__icons-items">
          <svg className="about-icons">
            <use xlinkHref="/svg-icons.svg#mongodb"></use>
          </svg>
          <p>MongoDB</p>
        </div>
      </div>
    </main>
  );
};

export default About;
