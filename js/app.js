/*fixed menu*/

window.addEventListener("scroll", showMenu);

function showMenu() {
  let menu = document.getElementById("home");
  let heightWrapper = document.querySelector(".wrapper-black").clientHeight;

  if (window.pageYOffset > heightWrapper) {
    menu.classList.add("fixed");
  } else {
    menu.classList.remove("fixed");
  }
}

/*animation*/

animation();

function animation() {
  let isScrolling = false;
  window.addEventListener("scroll", checkScroll, false);

  function checkScroll(e) {
    if (isScrolling == false) {
      window.requestAnimationFrame(function() {
        scrollAnimation(e);
        isScrolling = false;
      });
    }
    isScrolling = true;
  }

  document.addEventListener("DOMContentLoaded", scrollAnimation, false);

  function scrollAnimation(e) {
    let featureItems = Array.from(document.querySelectorAll(".important-item"));
    let skillsBox = document.querySelector(".skills");
    let services = Array.from(document.querySelectorAll(".services-item"));
    let skills = Array.from(document.querySelectorAll(".skill"));
    let worksBox = document.querySelector(".works-gallery");
    let works = Array.from(document.querySelectorAll(".works-content"));
    let blogBig = document.querySelector(".blog-list .big-item");
    let blogSmall = Array.from(
      document.querySelectorAll(".blog-list .small__item")
    );
    let review = document.querySelector(".reviews-slider");
    let form = document.querySelector(".contact-form");

    services.forEach(item => {
      initAnimation(isPartiallyVisible, item, "flip-in-x");
    });

    initAnimation(isFullyVisible, skillsBox, "slide-to-right");
    initAnimation(isFullyVisible, form, "flip-in-x");
    initAnimation(isPartiallyVisible, review, "slide-to-right");

    skills.forEach(item => {
      initAnimation(isFullyVisible, item, "active");
    });

    featureItems.forEach(item => {
      initAnimation(isFullyVisible, item, "flip-in-x");
    });

    initAnimation(isPartiallyVisible, worksBox, "scale");
    initAnimation(isPartiallyVisible, blogBig, "slide-to-right");

    blogSmall.forEach(item => {
      initAnimation(isPartiallyVisible, item, "slide-to-left");
    });
  }

  function initAnimation(visibility, item, animationName) {
    if (visibility(item) && !item.classList.contains(animationName)) {
      item.classList.add(animationName);
    }
  }
  function isPartiallyVisible(el) {
    let elementBoundary = el.getBoundingClientRect();

    let top = elementBoundary.top;
    let bottom = elementBoundary.bottom;
    let height = elementBoundary.height;

    return top + height >= 0 && height + window.innerHeight >= bottom;
  }

  function isFullyVisible(el) {
    let elementBoundary = el.getBoundingClientRect();

    let top = elementBoundary.top;
    let bottom = elementBoundary.bottom;

    return top >= 0 && bottom <= window.innerHeight;
  }
}

/*nav-link smooth scroll*/

let links = document.body.querySelectorAll("[data-scroll]");

links.forEach(link => {
  link.addEventListener("click", followLink);
});

function followLink(e) {
  e.preventDefault();
  let elementId = this.dataset.scroll;
  let elementOffset = document.getElementById(elementId).offsetTop;

  document.querySelector(".nav-link.active").classList.remove("active");
  this.classList.add("active");

  if (window.pageYOffset > elementOffset) {
    window.scrollBy({
      top: -window.pageYOffset + elementOffset,
      behavior: "smooth"
    });
  } else {
    window.scrollBy({
      top: elementOffset - window.pageYOffset,
      behavior: "smooth"
    });
  }
}

/*gallery filter*/
filterSelection("all"); // Execute the function and show all columns

function filterSelection(c) {
  let x, i;
  x = document.getElementsByClassName("works-content");
  if (c == "all") c = "";
  // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

// Show filtered elements
function w3AddClass(element, name) {
  let i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

// Hide elements that are not selected
function w3RemoveClass(element, name) {
  let i, arr1, arr2;
  arr1 = element.className.split(" "); //arr with class names
  arr2 = name.split(" "); //ar with names
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

// Add active class to the current button (highlight it)
let btnContainer = document.getElementById("btn-group");
let btns = btnContainer.getElementsByClassName("works-btn");
for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    let current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

/*review slider*/

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  const slides = document.getElementsByClassName("slide");
  const dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

/*logo slider*/

let slider = document.getElementById("brands-slider");
let sliderItems = document.getElementById("brands-items");
let prev = document.getElementById("prev");
let next = document.getElementById("next");

slide(slider, sliderItems, prev, next);

function slide(wrapper, items, prev, next) {
  let posX1 = 0,
    posX2 = 0,
    posInitial,
    posFinal,
    threshold = 100,
    slides = items.getElementsByClassName("brands-slide"),
    slidesLength = slides.length,
    slideSize = items.getElementsByClassName("brands-slide")[0].offsetWidth,
    firstSlide = slides[0],
    lastSlide = slides[slidesLength - 1],
    cloneFirst = firstSlide.cloneNode(true),
    cloneLast = lastSlide.cloneNode(true),
    index = 0,
    allowShift = true;

  // Clone first and last slide
  items.appendChild(cloneFirst);
  items.insertBefore(cloneLast, firstSlide);
  wrapper.classList.add("loaded");

  shiftSlide(1);

  // Mouse and Touch events
  items.onmousedown = dragStart;

  // Touch events
  items.addEventListener("touchstart", dragStart);
  items.addEventListener("touchend", dragEnd);
  items.addEventListener("touchmove", dragAction);

  // Click events
  prev.addEventListener("click", function() {
    shiftSlide(-1);
  });
  next.addEventListener("click", function() {
    shiftSlide(1);
  });

  // Transition events
  items.addEventListener("transitionend", checkIndex);

  function dragStart(e) {
    e = e || window.event;
    e.preventDefault();
    posInitial = items.offsetLeft;

    if (e.type == "touchstart") {
      posX1 = e.touches[0].clientX;
    } else {
      posX1 = e.clientX;
      document.onmouseup = dragEnd;
      document.onmousemove = dragAction;
    }
  }

  function dragAction(e) {
    e = e || window.event;

    if (e.type == "touchmove") {
      posX2 = posX1 - e.touches[0].clientX;
      posX1 = e.touches[0].clientX;
    } else {
      posX2 = posX1 - e.clientX;
      posX1 = e.clientX;
    }
    items.style.left = items.offsetLeft - posX2 + "px";
  }

  function dragEnd(e) {
    posFinal = items.offsetLeft;
    if (posFinal - posInitial < -threshold) {
      shiftSlide(1, "drag");
    } else if (posFinal - posInitial > threshold) {
      shiftSlide(-1, "drag");
    } else {
      items.style.left = posInitial + "px";
    }

    document.onmouseup = null;
    document.onmousemove = null;
  }

  function shiftSlide(dir, action) {
    items.classList.add("shifting");

    if (allowShift) {
      if (!action) {
        posInitial = items.offsetLeft;
      }

      if (dir == 1) {
        items.style.left = posInitial - slideSize + "px";
        index++;
      } else if (dir == -1) {
        items.style.left = posInitial + slideSize + "px";
        index--;
      }
    }

    allowShift = false;
  }

  function checkIndex() {
    items.classList.remove("shifting");

    if (index == -1) {
      items.style.left = -(slidesLength * slideSize) + "px";
      index = slidesLength - 1;
    }

    if (index == slidesLength) {
      items.style.left = -(1 * slideSize) + "px";
      index = 0;
    }

    allowShift = true;
  }
}

/*burger menu*/

let burgerBtn = document.querySelector(".nav-burger");
let navigation = document.querySelector(".nav-list");

burgerBtn.addEventListener("click", function() {
  navigation.classList.toggle("active");
  burgerBtn.classList.toggle("active");
});
