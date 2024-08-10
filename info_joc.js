document.addEventListener('DOMContentLoaded', function() {
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight){
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            } 
        });
    }
});

var header = document.getElementById('header');
var headerOffset = header.offsetTop;

function handleScroll() {
    if (window.innerWidth >= 600) {
        if (window.pageYOffset >= headerOffset) {
            header.classList.add('fixed-header');
        } else {
            header.classList.remove('fixed-header');
        }
    }
}

window.addEventListener('scroll', handleScroll);
window.addEventListener('resize', handleScroll);
