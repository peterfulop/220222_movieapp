import { slide } from "./navigation.js";

const leftArrows = document.querySelectorAll(".arrow__left");
const rightArrows = document.querySelectorAll(".arrow__right");

if (leftArrows) {
  leftArrows.forEach((leftArrow) => {
    leftArrow.addEventListener("click", () => {
      const container =
        leftArrow.parentElement.querySelector(".scroll-container");
      const rightArrow = leftArrow.parentElement.querySelector(".arrow__right");
      slide("left", leftArrow, rightArrow, container);
    });
  });
}
if (rightArrows) {
  rightArrows.forEach((rightArrow) => {
    rightArrow.addEventListener("click", () => {
      const container =
        rightArrow.parentElement.querySelector(".scroll-container");
      const leftArrow = rightArrow.parentElement.querySelector(".arrow__left");
      slide("right", leftArrow, rightArrow, container);
    });
  });
}
