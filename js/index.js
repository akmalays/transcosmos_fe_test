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

  // expertise tabs interaction
  const expertiseTabs = document.querySelectorAll(".expertise-tab");
  const expertisePanels = document.querySelectorAll(".expertise-panel");
  if (expertiseTabs.length > 0) {
    expertiseTabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        const targetTab = this.getAttribute("data-tab");

        expertiseTabs.forEach(function (t) {
          t.classList.remove("active");
          t.setAttribute("aria-selected", "false");
        });

        this.classList.add("active");
        this.setAttribute("aria-selected", "true");

        expertisePanels.forEach(function (panel) {
          if (panel.id === `panel-${targetTab}`) {
            panel.classList.add("active");
          } else {
            panel.classList.remove("active");
          }
        });
      });
    });
  }

  // what we do slider interaction
  const sliderTrack = document.getElementById("js-slider-track");
  const sliderPrev = document.getElementById("js-slider-prev");
  const sliderNext = document.getElementById("js-slider-next");
  const sliderDots = document.querySelectorAll(".slider-dot");
  const sliderCards = document.querySelectorAll(".slider-card");

  if (sliderTrack && sliderCards.length > 0) {
    let currentIndex = 0;

    function getMaxIndex() {
      const isDesktop = window.innerWidth >= 768;
      return isDesktop ? Math.ceil(sliderCards.length / 2) - 1 : sliderCards.length - 1;
    }

    function updateSlider(index) {
      const maxIndex = getMaxIndex();
      if (index < 0) {
        currentIndex = maxIndex;
      } else if (index > maxIndex) {
        currentIndex = 0;
      } else {
        currentIndex = index;
      }

      const isDesktop = window.innerWidth >= 768;
      const step = isDesktop ? 100 : 100;
      sliderTrack.style.transform = `translateX(-${currentIndex * step}%)`;

      sliderDots.forEach(function (dot, i) {
        if (i === currentIndex) {
          dot.classList.add("active");
        } else {
          dot.classList.remove("active");
        }
      });
    }

    if (sliderPrev) {
      sliderPrev.addEventListener("click", function () {
        updateSlider(currentIndex - 1);
      });
    }

    if (sliderNext) {
      sliderNext.addEventListener("click", function () {
        updateSlider(currentIndex + 1);
      });
    }

    sliderDots.forEach(function (dot) {
      dot.addEventListener("click", function () {
        const targetIndex = parseInt(this.getAttribute("data-index"), 10);
        updateSlider(targetIndex);
      });
    });

    window.addEventListener("resize", function () {
      updateSlider(currentIndex);
    });
  }

  // footer navbar clone
  const topNav = document.querySelector(".global-nav-top");
  const footerTarget = document.getElementById("js-footer-nav");
  if (topNav && footerTarget) {
    const footerNav = topNav.cloneNode(true);
    footerNav.classList.remove("global-nav-top");
    footerNav.classList.add("global-nav-footer");

    // adjust menu element id and display in footer
    const footerBtnMenu = footerNav.querySelector(".btn-menu");
    if (footerBtnMenu) {
      footerBtnMenu.remove();
    }

    const footerMenu = footerNav.querySelector(".global-nav-menu");
    if (footerMenu) {
      footerMenu.removeAttribute("id");
      footerMenu.classList.add("is-footer");
    }

    // add text-gradient class to brand name and tagline
    const footerName = footerNav.querySelector(".global-nav-name");
    if (footerName) {
      footerName.classList.add("text-gradient");
    }

    const footerTagline = footerNav.querySelector(".global-nav-tagline");
    if (footerTagline) {
      footerTagline.classList.add("text-gradient");
    }

    // add text-gradient class to all navigation links
    const footerLinks = footerNav.querySelectorAll(".global-nav-link");
    footerLinks.forEach(function (link) {
      if (!link.classList.contains("global-nav-lang")) {
        link.classList.add("text-gradient");
      }
    });

    // replace star and globe icons with gradient versions in footer
    const footerStar = footerNav.querySelector(".global-nav-star");
    if (footerStar) {
      footerStar.src = "images/star-gradient.png";
    }

    const footerGlobe = footerNav.querySelector(".global-nav-globe");
    if (footerGlobe) {
      footerGlobe.src = "images/vector-gradient.png";
    }

    footerTarget.appendChild(footerNav);
  }
});
