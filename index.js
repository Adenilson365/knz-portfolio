// ---
const hamMenuBtn = document.querySelector(".header__main-ham-menu-cont");
const smallMenu = document.querySelector(".header__sm-menu");
const headerHamMenuBtn = document.querySelector(".header__main-ham-menu");
const headerHamMenuCloseBtn = document.querySelector(
  ".header__main-ham-menu-close"
);
const headerSmallMenuLinks = document.querySelectorAll(".header__sm-menu-link");

hamMenuBtn.addEventListener("click", () => {
  if (smallMenu.classList.contains("header__sm-menu--active")) {
    smallMenu.classList.remove("header__sm-menu--active");
  } else {
    smallMenu.classList.add("header__sm-menu--active");
  }
  if (headerHamMenuBtn.classList.contains("d-none")) {
    headerHamMenuBtn.classList.remove("d-none");
    headerHamMenuCloseBtn.classList.add("d-none");
  } else {
    headerHamMenuBtn.classList.add("d-none");
    headerHamMenuCloseBtn.classList.remove("d-none");
  }
});

for (let i = 0; i < headerSmallMenuLinks.length; i++) {
  headerSmallMenuLinks[i].addEventListener("click", () => {
    smallMenu.classList.remove("header__sm-menu--active");
    headerHamMenuBtn.classList.remove("d-none");
    headerHamMenuCloseBtn.classList.add("d-none");
  });
}

// ---
const headerLogoConatiner = document.querySelector(".header__logo-container");

headerLogoConatiner.addEventListener("click", () => {
  location.href = "/";
});

document.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll(".carousel");
  carousels.forEach((carousel) => {
    const images = carousel.querySelectorAll(".carousel__img");
    const btnLeft = carousel.querySelector(".carousel__btn--left");
    const btnRight = carousel.querySelector(".carousel__btn--right");
    let current = 0;

    const showImage = (index) => {
      images.forEach((img, i) => img.classList.toggle("active", i === index));
    };

    btnLeft.addEventListener("click", () => {
      current = (current - 1 + images.length) % images.length;
      showImage(current);
    });

    btnRight.addEventListener("click", () => {
      current = (current + 1) % images.length;
      showImage(current);
    });

    showImage(current);
  });
});

// Extras
document.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll(".carousel");
  const modal = document.getElementById("imgModal");
  const modalImg = document.getElementById("imgModalImg");
  const modalClose = document.getElementById("imgModalClose");
  const modalBtnLeft = document.querySelector(".img-modal__btn--left");
  const modalBtnRight = document.querySelector(".img-modal__btn--right");

  let currentModalIndex = 0;
  let modalImages = [];

  carousels.forEach((carousel) => {
    const images = carousel.querySelectorAll(".carousel__img");
    const btnLeft = carousel.querySelector(".carousel__btn--left");
    const btnRight = carousel.querySelector(".carousel__btn--right");
    let current = 0;

    // Oculta os botões do carrossel se houver apenas uma imagem
    if (images.length <= 1) {
      if (btnLeft) btnLeft.style.display = "none";
      if (btnRight) btnRight.style.display = "none";
    }

    const showImage = (index) => {
      images.forEach((img, i) => img.classList.toggle("active", i === index));
    };

    btnLeft?.addEventListener("click", () => {
      if (modal.style.display === "flex") return;
      current = (current - 1 + images.length) % images.length;
      showImage(current);
    });

    btnRight?.addEventListener("click", () => {
      if (modal.style.display === "flex") return;
      current = (current + 1) % images.length;
      showImage(current);
    });

    images.forEach((img, i) => {
      img.addEventListener("click", () => {
        modal.style.display = "flex";
        modalImages = Array.from(images);
        currentModalIndex = i;
        modalImg.src = modalImages[currentModalIndex].src;

        // Oculta botões do modal se for apenas uma imagem
        if (modalImages.length <= 1) {
          modalBtnLeft.style.display = "none";
          modalBtnRight.style.display = "none";
        } else {
          modalBtnLeft.style.display = "block";
          modalBtnRight.style.display = "block";
        }
      });
    });

    showImage(current);
  });

  modalBtnLeft.addEventListener("click", () => {
    currentModalIndex =
      (currentModalIndex - 1 + modalImages.length) % modalImages.length;
    modalImg.src = modalImages[currentModalIndex].src;
  });

  modalBtnRight.addEventListener("click", () => {
    currentModalIndex = (currentModalIndex + 1) % modalImages.length;
    modalImg.src = modalImages[currentModalIndex].src;
  });

  modalClose.addEventListener("click", () => {
    modal.style.display = "none";
    modalImages = [];
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      modalImages = [];
    }
  });

  document.addEventListener("keydown", (e) => {
    if (modal.style.display === "flex") {
      if (e.key === "Escape") {
        modal.style.display = "none";
        modalImages = [];
      } else if (e.key === "ArrowLeft") {
        currentModalIndex =
          (currentModalIndex - 1 + modalImages.length) % modalImages.length;
        modalImg.src = modalImages[currentModalIndex].src;
      } else if (e.key === "ArrowRight") {
        currentModalIndex = (currentModalIndex + 1) % modalImages.length;
        modalImg.src = modalImages[currentModalIndex].src;
      }
    }
  });
});
