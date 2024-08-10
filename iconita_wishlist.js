function updateWishlistCount() {
    var wishlist = localStorage.getItem('wishlist');
    var totalItems = 0;
    if (wishlist !== null) {
        wishlist = JSON.parse(wishlist);
        totalItems = wishlist.length;
    }
    var wishlistCount = document.getElementById('wishlistCount');
    if (totalItems >= 10) {
        wishlistCount.textContent = '+9';
    } else {
        wishlistCount.textContent = totalItems;
    }
}

function removeFromWishlist(index) {
    var wishlist = localStorage.getItem('wishlist');
    if (wishlist !== null) {
        wishlist = JSON.parse(wishlist);
        wishlist.splice(index, 1);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        showWishlist();
        updateWishlistCount();
    }
}

function showWishlist() {
    var wishlist = localStorage.getItem('wishlist');
    if (wishlist !== null) {
        wishlist = JSON.parse(wishlist);
        var wishlistItemsDiv = document.getElementById('wishlist-items');
        wishlistItemsDiv.innerHTML = '';

        wishlist.forEach(function (product, index) {
            var productDiv = document.createElement('div');
            productDiv.classList.add('wishlist-item');
            productDiv.innerHTML = '<a href="' + product.url + '">' +
                '<img src="' + product.image + '" alt="' + product.name + '">' +
                '</a>' +
                '<p class="info-produs-wishlist">' + product.name + '</p>' +
                '<p class="info-produs-wishlist">Price: $' + product.price + '</p>' +
                '<button class="remove-btn" onclick="removeFromWishlist(' + index + ')"><i class="fa-solid fa-trash-can"></i></button>';
            wishlistItemsDiv.appendChild(productDiv);
        });
    } else {
        var emptyWishlistDiv = document.createElement('div');
        emptyWishlistDiv.textContent = 'Your wishlist is empty';
        document.body.appendChild(emptyWishlistDiv);
    }
}

updateWishlistCount();
showWishlist();