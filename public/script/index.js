import { login, logout, signup } from "./login";
import { updateSettings, updatePassword } from "./updateProfile";
import { registerAnOrder, removeAnOrder } from "./registerOrder";
import { addComment } from "./comment";

////////filters

// const brandsCheckboxContainer = document.querySelector(".filters__brands");
// console.log(brandsCheckboxContainer);
// if (brandsCheckboxContainer) {
//   brandsCheckboxContainer.addEventListener("click", (e) => {
//     if (e.target.classList.contains("filters__brands-item-checkbox")) {
//       const id = e.target.getAttribute("id");
//       window.location.assign(`/?brandEnglish=${id}`);
//     }
//   });
// }

////////// comment

const addCommentBtn = document.querySelector(".btn-add-comment");

if (addCommentBtn) {
  addCommentBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const productId = e.target.dataset.productId;
    let data = {
      title: "",
      review: "",
      rating: "",
      recommend: "",
    };

    data.title = document.getElementById("addcomment-title").value;
    data.review = document.getElementById("addcomment-description").value;
    data.rating = document.getElementById("rating").value;
    data.recommend = document.getElementById("suggestion-status").value;

    await addComment(data, productId);
  });
}

///////cart
const screenCover = document.querySelector(".screencover");
const cartBtn = document.querySelector(".btn-cart");
const cartModal = document.querySelector(".cart-modal");

if (screenCover) {
  cartBtn.addEventListener("mouseover", (e) => {
    e.preventDefault();
    cartModal.style.display = "flex";
    screenCover.style.display = "block";
  });
  screenCover.addEventListener("mouseover", (e) => {
    e.preventDefault();
    cartModal.style.display = "none";
    screenCover.style.display = "none";
  });
}

//////// Register Order

const registerBtn = document.querySelectorAll(".addtocart");
const removeBtn = document.querySelectorAll(".removefromcart");

if (registerBtn) {
  registerBtn.forEach((el) =>
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const productId = e.target.dataset.productId;

      registerAnOrder(productId);
    })
  );
}
if (removeBtn) {
  removeBtn.forEach((el) =>
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const productId = e.target.dataset.productId;

      removeAnOrder(productId);
    })
  );
}

////////// Singup
const btnSignup = document.querySelector(".signup-btn-2");

if (btnSignup) {
  let data = {
    name: "",
    family: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  btnSignup.addEventListener("click", function (e) {
    e.preventDefault();
    data.name = document.getElementById("name").value;
    data.family = document.getElementById("family").value;
    data.email = document.getElementById("email").value;
    data.password = document.getElementById("password").value;
    data.confirmPassword = document.getElementById("confirm-password").value;

    signup(data);
  });
}

////////// Update PRofile

const btnUpdateSettings = document.querySelector(".btn-profile-changesetting");

if (btnUpdateSettings) {
  let data = {
    name: "",
    family: "",
    email: "",
  };
  btnUpdateSettings.addEventListener("click", function (e) {
    e.preventDefault();
    data.name = document.getElementById("profile__form-name").value;
    data.family = document.getElementById("profile__form-family").value;
    data.email = document.getElementById("profile__form-email").value;

    updateSettings(data);
  });
}

const btnUpdatePassword = document.querySelector(".btn-profile-updatepassword");

if (btnUpdatePassword) {
  let data = {
    passwordCurrent: "",
    password: "",
    confirmPassword: "",
  };
  btnUpdatePassword.addEventListener("click", async function (e) {
    e.preventDefault();
    btnUpdatePassword.style.textContent = "در حال تغییر پسورد...";
    data.passwordCurrent = document.getElementById(
      "profile__form-passwordCurrent"
    ).value;
    data.password = document.getElementById("profile__form-password").value;
    data.confirmPassword = document.getElementById(
      "profile__form-confirmPassword"
    ).value;

    await updatePassword(data);
    btnUpdatePassword.style.textContent = "تغییر پسورد";

    document.getElementById("profile__form-passwordCurrent").value = "";
    document.getElementById("profile__form-password").value = "";
    document.getElementById("profile__form-confirmPassword").value = "";
  });
}

//////// login
const singinForm = document.querySelector(".signin");
if (singinForm) {
  singinForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    login(email, password);
  });
}

///////// logout
const logoutButton = document.querySelector(".profile-modal__logout");
if (logoutButton) {
  logoutButton.addEventListener("click", function (e) {
    e.preventDefault();
    logout();
  });
}

//////// Sliders of price filter

window.onload = function () {
  slideOne();
  slideTwo();
  modalController();
};

let sliderOne = document.getElementById("min-slider");
let sliderTwo = document.getElementById("max-slider");
let displayValOne = document.querySelector(".slider__prices-min");
let displayValTwo = document.querySelector(".slider__prices-max");
let minGap = 0;
let sliderTrack = document.querySelector(".slider-track");
let sliderMaxValue = document.getElementById("min-slider");

if (sliderOne && sliderTwo) {
  sliderOne.addEventListener("input", slideOne);
  sliderTwo.addEventListener("input", slideTwo);
}

function slideOne() {
  if (sliderOne && sliderTwo) {
    if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
      sliderOne.value = parseInt(sliderTwo.value) - minGap;
    }
    const content = new Intl.NumberFormat("fa-IR").format(sliderOne.value);
    displayValOne.textContent = content;
    fillColor();
  }
}

function slideTwo() {
  if (sliderOne && sliderTwo) {
    if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
      sliderTwo.value = parseInt(sliderOne.value) + minGap;
    }
    const content = new Intl.NumberFormat("fa-IR").format(sliderTwo.value);
    displayValTwo.textContent = content;
    fillColor();
  }
}

function fillColor() {
  const percent1 = (sliderOne.value / sliderMaxValue.max) * 100;
  const percent2 = (sliderTwo.value / sliderMaxValue.max) * 100;
  sliderTrack.style.background = `linear-gradient(to left, #dadae5 ${percent1}% , #00bac7 ${percent1}% , #00bac7 ${percent2}%, #dadae5 ${percent2}%)`;
}

///////// Filters and sorting

const openFilters = document.querySelector(".filters-openicon");
const openSorting = document.querySelector(".sorting-openicon");
const closeFilters = document.querySelector(".filters__title-closeicon");
const closeSorting = document.querySelector(
  ".content__sorting-desktop-title-closeicon"
);
const filtersWindow = document.querySelector(".filters");
const sortingWindow = document.querySelector(".content__sorting-desktop-list");

let modelaIsOpen = false;

const modalController = function () {
  if (filtersWindow) {
    if (
      document.body.getBoundingClientRect().width <= 1024 &&
      modelaIsOpen === false
    ) {
      filtersWindow.style.opacity = "0";
      filtersWindow.style.width = "0";
      filtersWindow.style.height = "0";
      filtersWindow.style.position = "fixed";
      filtersWindow.style.top = "0";
      filtersWindow.style.left = "0";
      filtersWindow.style.padding = "4rem";
      filtersWindow.style.background = "#fff";
      filtersWindow.style.display = "none";

      sortingWindow.style.opacity = "0";
      sortingWindow.style.width = "0";
      sortingWindow.style.height = "0";
      sortingWindow.style.position = "fixed";
      sortingWindow.style.top = "0";
      sortingWindow.style.left = "0";
      sortingWindow.style.padding = "4rem";
      sortingWindow.style.background = "#fff";
      sortingWindow.style.flexDirection = "column";
      sortingWindow.style.fontsize = "2.6rem";
      sortingWindow.style.display = "none";
    }

    if (
      document.body.getBoundingClientRect().width > 1024 &&
      modelaIsOpen === false
    ) {
      filtersWindow.style.width = "27rem";
      filtersWindow.style.height = "auto";
      filtersWindow.style.opacity = "100";
      filtersWindow.style.position = "";
      filtersWindow.style.top = "0";
      filtersWindow.style.left = "0";
      filtersWindow.style.padding = "2rem";
      filtersWindow.style.background = "";
      filtersWindow.style.display = "flex";

      sortingWindow.style.width = "auto";
      sortingWindow.style.height = "auto";
      sortingWindow.style.opacity = "100";
      sortingWindow.style.position = "";
      sortingWindow.style.top = "0";
      sortingWindow.style.left = "0";
      sortingWindow.style.padding = "0";
      sortingWindow.style.background = "";
      sortingWindow.style.display = "flex";
      sortingWindow.style.flexDirection = "row";
    }
  }
};

window.onresize = modalController;

if (filtersWindow) {
  openFilters.addEventListener("click", function (e) {
    e.preventDefault();
    modelaIsOpen = true;
    filtersWindow.style.opacity = "100";
    filtersWindow.style.height = "100vh";
    filtersWindow.style.width = "100vw";
    filtersWindow.style.display = "flex";
    document.body.style.top = `-${window.scrollY}px`;
    document.body.style.position = "fixed";
  });
  closeFilters.addEventListener("click", function () {
    modelaIsOpen = false;
    filtersWindow.style.opacity = "0";
    filtersWindow.style.width = "0";
    filtersWindow.style.height = "0";
    filtersWindow.style.display = "none";
    const scrollY = document.body.getBoundingClientRect().top;
    document.body.style.position = "";
    document.body.style.top = 0;
    window.scrollTo(0, parseInt(scrollY || "0") * -1);
  });
  openSorting.addEventListener("click", function (e) {
    modelaIsOpen = true;
    sortingWindow.style.opacity = "100";
    sortingWindow.style.height = "100vh";
    sortingWindow.style.width = "100vw";
    sortingWindow.style.display = "flex";
    sortingWindow.style.flexDirection = "column";

    document.body.style.top = `-${window.scrollY}px`;
    document.body.style.position = "fixed";
  });
  closeSorting.addEventListener("click", function () {
    modelaIsOpen = false;
    sortingWindow.style.opacity = "0";
    sortingWindow.style.height = "0";
    sortingWindow.style.width = "0";
    sortingWindow.style.display = "none";
    sortingWindow.style.flexDirection = "row";
    const scrollY = document.body.getBoundingClientRect().top;
    document.body.style.position = "";
    document.body.style.top = 0;
    window.scrollTo(0, parseInt(scrollY || "0") * -1);
  });
}

///////////// Product Image Hover Zoom

const elementSellerInfo = document.querySelector(".sellercard-info");
const elementSellerModal = document.querySelector(".sellermodal");

if (elementSellerInfo) {
  elementSellerInfo.addEventListener("mouseenter", function () {
    if (window.innerWidth > 1024) {
      elementSellerModal.classList.remove("modal-hidden");
    }
  });

  elementSellerInfo.addEventListener("mouseleave", function () {
    if (window.innerWidth > 1024) {
      elementSellerModal.classList.add("modal-hidden");
    }
  });
}
const containerSmallImages = document.querySelector(
  ".product__image-bottom-small"
);
const mainImage = document.querySelector(".product__image-top-main");
const containerMainImage = document.querySelector(".product__mainimagebox");
const hoverBox = document.querySelector(".hoverzoom-hoverbox");
const zoomBox = document.querySelector(".hoverzoom-box");
const zoomImg = document.querySelector(".hoverzoom-img");

if (mainImage) {
  containerSmallImages.addEventListener("click", function (e) {
    if (e.target.classList.contains("product__smallimages")) {
      mainImage.setAttribute("src", e.target.getAttribute("src"));
      zoomImg.setAttribute("src", e.target.getAttribute("src"));
    }
  });

  containerMainImage.addEventListener("mouseenter", function () {
    if (window.innerWidth > 1024) {
      hoverBox.style.width = window.getComputedStyle(mainImage).width;
      hoverBox.style.display = "block";
      zoomBox.style.display = "block";
    }
  });

  hoverBox.addEventListener("mousemove", function (e) {
    if (window.innerWidth > 1024) {
      e.preventDefault();
      hoverBox.style.left = `${e.pageX}px`;
      hoverBox.style.top = `${e.pageY}px`;

      zoomImg.style.transform = `translateX(${
        mainImage.getBoundingClientRect().right - e.pageX
      }px)`;
      zoomImg.style.transform = `translateY(${
        mainImage.getBoundingClientRect().top - e.pageY
      }px)`;
    }
  });

  mainImage.addEventListener("mousemove", function (e) {
    if (window.innerWidth > 1024) {
      hoverBox.style.left = `${e.pageX}px`;
      hoverBox.style.top = `${e.pageY}px`;
    }
  });

  document.body.addEventListener("mousemove", function (e) {
    if (
      e.pageX >= mainImage.getBoundingClientRect().right ||
      e.pageX <= mainImage.getBoundingClientRect().left ||
      e.pageY >= mainImage.getBoundingClientRect().bottom ||
      e.pageY <= mainImage.getBoundingClientRect().top
    ) {
      hoverBox.style.display = "none";
      zoomBox.style.display = "none";
      return;
    }
  });
}
