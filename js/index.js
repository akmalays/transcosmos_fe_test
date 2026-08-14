// logic section
document.addEventListener("DOMContentLoaded", function () {
  const btnMenu = document.getElementById("js-btn-menu");
  const globalNav = document.getElementById("js-global-nav");

  if (btnMenu && globalNav) {
    btnMenu.addEventListener("click", function () {
      const isOpen = globalNav.classList.toggle("is-open");
      btnMenu.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }
});
