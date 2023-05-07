const removeAlret = () => {
  const el = document.querySelector(".alert");
  if (el) el.parentElement.removeChild(el);
};

export const showAlert = (status, message) => {
  const markup = `<div class="alert alert__${status}">${message}</div>`;
  document.querySelector("body").insertAdjacentHTML("afterbegin", markup);

  window.setTimeout(removeAlret, 3000);
};
