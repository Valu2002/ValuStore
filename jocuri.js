let currentScrollPosition = 0;
let scrollAmount = 1000;


const sCont = document.querySelector(".joc-container");
const hScroll = document.querySelector(".scroll");
const btnScrollLeft = document.querySelector("#btn-scroll-left");
const btnScrollRight = document.querySelector("#btn-scroll-right");

btnScrollLeft.style.opacity = "0";

let maxScroll = -sCont.offsetWidth + hScroll.offsetWidth;

function scrollHorizontally(val) {
  currentScrollPosition += (val * scrollAmount);

  if (currentScrollPosition >= 0) {
    currentScrollPosition = 0;
    btnScrollLeft.style.opacity = "0";
  }
  else {
    btnScrollLeft.style.opacity = "1";
  }
  if (currentScrollPosition <= maxScroll) {
    currentScrollPosition = maxScroll;
    btnScrollRight.style.opacity = "0";
  }
  else {
    btnScrollRight.style.opacity = "1";
  }

  sCont.style.left = currentScrollPosition + "px";
}

function adjustScrollSpeed() {
  if (window.innerWidth <= 600 && window.innerWidth >= 300) {
    scrollAmount = 500;
  } else {
    scrollAmount = 1000; 
  }
}


adjustScrollSpeed();


window.addEventListener('resize', adjustScrollSpeed);

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}


var checkboxes = document.querySelectorAll('.option-input.checkbox');

checkboxes.forEach(function (checkbox) {
  checkbox.addEventListener('click', function () {
    checkboxes.forEach(function (otherCheckbox) {
      if (otherCheckbox !== checkbox) {
        otherCheckbox.checked = false;
      }
    });
  });
});


var header = document.getElementById('header');


var headerOffset = header.offsetTop;

function handleScroll() {

  if (window.pageYOffset >= headerOffset) {
    header.classList.add('fixed-header');
  } else {
    header.classList.remove('fixed-header');
  }
}

window.addEventListener('scroll', handleScroll);

