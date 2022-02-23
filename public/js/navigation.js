export const slide = (direction, leftArrow, rightArrow, container) => {
  let scrollCompleted = 0;
  let actualPosition = 0;
  var maxScrollLeft = container.scrollWidth - container.clientWidth;

  if (maxScrollLeft === 0) return;

  const slideVar = setInterval(function () {
    if (direction == "left") {
      container.scrollLeft -= 50;
    } else {
      container.scrollLeft += 50;
    }
    scrollCompleted += 10;
    actualPosition = container.scrollLeft;

    if (scrollCompleted >= 100) {
      window.clearInterval(slideVar);

      if (container.scrollLeft > 0) {
        leftArrow.classList.remove("invisible");
        leftArrow.classList.add("visible");
      } else {
        leftArrow.classList.remove("visible");
        leftArrow.classList.add("invisible");
      }

      if (maxScrollLeft === actualPosition) {
        rightArrow.classList.remove("visible");
        rightArrow.classList.add("invisible");
      } else {
        rightArrow.classList.remove("invisible");
        rightArrow.classList.add("visible");
      }
    }
  }, 50);
};
