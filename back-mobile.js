const backArrow = document.querySelector('.back-arrow');
function toggleBackArrowVisibility() {
    if (window.innerWidth >= 300 && window.innerWidth <= 600) {
        if (window.scrollY > -1) {
            backArrow.style.display = 'block';
        } else {
            backArrow.style.display = 'none';
        }
    } else {
        backArrow.style.display = 'none'; 
    }
}

window.addEventListener('scroll', toggleBackArrowVisibility);

toggleBackArrowVisibility();