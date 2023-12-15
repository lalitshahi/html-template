// To toggle menu drop down on click of menu bar icon
document.addEventListener("click", function(event) {
  // If the event target doesn't match bail
  if (!event.target.closest(".burger-container")) return;

  const header = document.querySelector(".header");
  const menuIcon = document.querySelector(".menu-icon");
  menuIcon.classList.toggle("open");
  header.classList.toggle("menu-opened");
});

// Sets the defaults on load
window.onload = function() {
  enableSwiper();
  openFirstDesc();
};

//===========================//

const enableSwiper = function() {
  const mySwiper = new Swiper(".swiper-container", {
    pagination: {
      el: ".swiper-pagination",
    },
  });
};

//===========================//

const openFirstDesc = function() {
  const description = document.querySelector(".description");
  const heading = document.querySelector(".tab h1");
  heading.classList.remove("active");
  heading.classList.add("active");
  description.classList.remove("open");
  description.classList.add("open");
};

//==========================//

document.addEventListener("click", function(event) {
  // If the event target doesn't match bail
  if (!event.target.closest(".tab h1")) return;

  const heading = event.target.closest(".tab h1");
  heading.classList.remove("active");
  heading.classList.add("active");
  const description = event.target.closest(".tab h1").nextSibling.nextSibling;
  description.classList.remove("open");
  description.classList.add("open");
  closeSiblings(description.parentNode);
});

//==========================//

// To close siblings if open and open the current clicked plan
const closeSiblings = function(element) {
  let sibling = element.parentNode.firstChild;
  while (sibling) {
    if (
      sibling.nodeType === 1 &&
      sibling !== element &&
      sibling.children.length !== 0
    ) {
      if (sibling.children[0].classList.contains("active")) {
        sibling.children[0].classList.remove("active");
        sibling.children[1].classList.remove("open");
      }
    }
    sibling = sibling.nextSibling;
  }
};

//==========================//

function smoothScroll(targetId, duration) {
  const startPosition = window.pageYOffset;
  // checking if clicked on logo, no element to select
  const target = targetId !== "/" ? document.querySelector(targetId) : null;

  // if clicked on logo, it will scroll to top of page
  const targetPosition =
    targetId !== "/" ? target.getBoundingClientRect().top : -startPosition;
  const distance = targetPosition; // subtracting header fixed height
  let startTime = null;
  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);

    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) {
      return (c / 2) * t * t + b;
    }
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

document.addEventListener("click", function(event) {
  // If the event target doesn't match bail
  if (!event.target.closest("a")) return;

  const targetId = event.target.closest("a").getAttribute("href");
  if (targetId === "/") event.preventDefault(); // preventing the default reload action
  smoothScroll(targetId, 1000);
});

document.addEventListener("click", function(event) {
  // If the event target doesn't match bail
  if (!event.target.closest(".gallery-image img")) return;
  var modal = document.getElementById("myModal");
  var img = event.target.closest(".gallery-image img");
  var modalImg = document.querySelector("#img");
  var captionText = document.getElementById("caption");

  modal.style.display = "block";
  modalImg.src = img.src;
  captionText.innerHTML = img.alt;

  // Get the <span> element that closes the modal
  var span = document.getElementById("close");

  // When the user clicks on <span> (x), close the modal
  span.addEventListener("click", function() {
    modal.style.display = "none";
  });
});
