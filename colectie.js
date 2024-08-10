const showMoreButton = document.querySelector('.show-more-btn');
const moreImages = document.querySelector('.more');

showMoreButton.addEventListener('click', function () {
    moreImages.classList.add('show');
    showMoreButton.style.display = 'none';
});
