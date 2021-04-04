const headerTitle = document.querySelector(".header__title");
const headerDescribe = document.querySelector(".header__describe");
const headerLink = document.querySelector(".header__link");
const scrollBar = document.querySelector(".scroll-bar");

function scrollHandle() {
  if (window.scrollY > 0) {
    scrollBar.style.height = Math.round(window.scrollY) / 5.5 + "px";
    scrollBar.style.backgroundColor = `rgba(${
      Math.round(window.scrollY) * 0.09
    },${Math.round(window.scrollY) * 0.01},${
      Math.round(window.scrollY) * 0.02
    },${1})`;
  }
}

const about = document.querySelector(".about");
const ourWork = document.querySelector(".our-work");
const team = document.querySelector(".team");
const feedback = document.querySelector(".feedback");
const order = document.querySelector(".order");
const sectionList = [about, ourWork, team, feedback, order];

const infoValue = {
  years: document.querySelector(".years").textContent * 1,
  projects: document.querySelector(".projects").textContent * 1,
  rewards: document.querySelector(".rewards").textContent * 1,
};

let flag = true;

class Section {
  constructor(elem) {
    this.elem = elem;
    this.arr = this.elem.getBoundingClientRect();
    this.visible = false;
  }
  //   window.scrollY <= this.arr.height

  increaseCounter(x = 0) {
    let years = document.querySelector(".years");
    let projects = document.querySelector(".projects");
    let rewards = document.querySelector(".rewards");
    if (x <= infoValue.projects) {
      if (x <= infoValue.years) {
        years.innerHTML = x;
      }
      if (x <= infoValue.rewards) {
        rewards.innerHTML = x;
      }
      projects.innerHTML = x;
    } else return;
    x++;
    setTimeout(() => {
      this.increaseCounter(x);
    }, 50);
  }

  elemHandleAbout() {
    // if (flag === false) return;
    if (this.elem.style.opacity == 1 && this.elem == about) {
      this.increaseCounter();
      flag = false;
    } else if (this.elem.style.opacity == 0 && this.elem === about) {
      this.increaseCounter(0);
    }
  }
  handleHow() {
    const howItem = document.querySelectorAll(".how__item");
    if (this.elem.style.opacity == 1 && this.elem == team) {
      howItem.forEach((item) => {
        item.classList.add("active");
      });
    } else if (this.elem.style.opacity == 0 && this.elem === team) {
      howItem.forEach((item) => {
        item.classList.remove("active");
      });
    }
  }
  elemHandle() {
    if (
      window.scrollY + this.elem.clientHeight / 4 >
        Math.round(this.arr.top) + pageYOffset &&
      this.arr.top + this.elem.clientHeight / 1.5 >= 0
    ) {
      this.elem.style.opacity = 1;
      this.visible = true;
    } else {
      this.visible = false;
      this.elem.style.opacity = 0;
    }
  }

  galleryHandle() {
    if (this.visible) {
      const backward = document.querySelector(".nav__backward");
      const forward = document.querySelector(".nav__forward");

      const sliderItem = document.querySelectorAll(".our-work__slider-item");

      const sliderListWidth = document.querySelector(".our-work__slider-list")
        .clientWidth;
      let counter = 0;

      backward.addEventListener("click", (e) => {
        e.preventDefault();
        if (counter >= 0) return;
        counter += sliderListWidth;
        sliderItem.forEach((item, index) => {
          item.style.transform = `translateX(${counter}px)`;
        });
      });

      forward.addEventListener("click", (e) => {
        e.preventDefault();

        if (counter <= (sliderItem.length - 1) * sliderListWidth * -1) return;
        counter -= sliderListWidth;
        sliderItem.forEach((item, index) => {
          item.style.transform = `translateX(${counter}px)`;
        });
      });
    } else if (this.visible == false) {
      return;
    }
  }

  handleFeedback() {
    if (this.visible == true) {
      const feedbackItem = document.querySelectorAll(".feedback__item");

      const feedbackWrapperWidth = document.querySelector(".feedback__wrapper")
        .clientWidth;

      const arrowLeft = document.querySelector(".feedback__arrow-left");
      const arrowRight = document.querySelector(".feedback__arrow-right");

      const firstElem = document.querySelector(".feedback__item.first");

      let counter = 0;

      arrowLeft.addEventListener("click", (e) => {
        e.preventDefault();
        if (counter >= 0) return;
        counter += feedbackWrapperWidth;
        feedbackItem.forEach((item, index) => {
          item.style.transform = `translateX(${counter}px)`;
        });
      });

      arrowRight.addEventListener("click", (e) => {
        e.preventDefault();

        if (counter <= (feedbackItem.length - 1) * feedbackWrapperWidth * -1)
          return;
        counter -= feedbackWrapperWidth;
        feedbackItem.forEach((item, index) => {
          item.style.transform = `translateX(${counter}px)`;
        });
      });
    } else {
      return;
    }
  }
}
const cross = document.querySelector(".header__triger");
const headerList = document.querySelector(".header__list");
function noScroll() {
  window.scrollTo(0, 0);
}

window.addEventListener("load", function () {
  headerTitle.style.transform = "translateY(0px)";
  headerTitle.style.opacity = "1";
  headerLink.style.transform = "translateX(0px)";
  headerLink.style.opacity = "1";
  headerDescribe.style.opacity = "1";

  cross.addEventListener("click", function () {
    this.classList.toggle("active");
    headerList.classList.toggle("header__list--active");
    if (this.classList.contains("active")) {
      window.addEventListener("scroll", noScroll);
      const itemLink = document.querySelectorAll(".item__link");

      itemLink.forEach((item) => {
        item.addEventListener("click", function () {
          // window.location.hash
          window.removeEventListener("scroll", noScroll);
          headerList.classList.remove("header__list--active");
          cross.classList.remove("active");
        });
      });
    } else {
      window.removeEventListener("scroll", noScroll);
    }
  });

  window.addEventListener("scroll", () => {
    scrollHandle();
    for (let i = 0; i < sectionList.length; i++) {
      let elem = new Section(sectionList[i]);
      elem.elemHandle();
      elem.elemHandleAbout();
      elem.handleHow();
      elem.handleFeedback();
      elem.galleryHandle();
    }
  });
});
