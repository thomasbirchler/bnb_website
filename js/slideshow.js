document.addEventListener("DOMContentLoaded", () => {
  const slideshows = document.querySelectorAll(".slideshow");

  slideshows.forEach(slideshow => {
    let images = slideshow.querySelectorAll("img");
    let index = 0;

    const showImage = (i) => {
      images.forEach(img => img.classList.remove("active"));
      images[i].classList.add("active");
    };

    // Erste Folie anzeigen
    showImage(index);

    let interval;

    const startAutoSlide = () => {
      clearInterval(interval);
      interval = setInterval(() => {
        index = (index + 1) % images.length;
        showImage(index);
      }, 8000);
    };

    startAutoSlide();

    const leftArrow = slideshow.querySelector(".slide-arrow.left");
    const rightArrow = slideshow.querySelector(".slide-arrow.right");

    if (leftArrow && rightArrow) {
      leftArrow.addEventListener("click", () => {
        index = (index - 1 + images.length) % images.length;
        showImage(index);
        startAutoSlide();
      });

      rightArrow.addEventListener("click", () => {
        index = (index + 1) % images.length;
        showImage(index);
        startAutoSlide();
      });
    }
  });
});
