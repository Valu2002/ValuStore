function addToWishlist(name, price, image, url) {
    var product = {
        "name": name,
        "price": price.toFixed(2),
        "image": image,
        "url": url
    };

    var wishlist = localStorage.getItem('wishlist');
    if (wishlist === null) {
        wishlist = [];
    } else {
        wishlist = JSON.parse(wishlist);
    }

    var existingIndex = wishlist.findIndex(function (item) {
        return item.name === product.name;
    });

    if (existingIndex === -1) {
        wishlist.push(product);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        alert('Product added to wishlist!');
    } else {
        alert('Product is already in your wishlist!');
    }

    showWishlist();
}

function showWishlist() {
    var wishlist = localStorage.getItem('wishlist');
    var wishlistItemsDiv = document.getElementById('wishlist-items');

    if (wishlist !== null && wishlistItemsDiv !== null) {
        wishlist = JSON.parse(wishlist);
        wishlistItemsDiv.innerHTML = '';

        wishlist.forEach(function (product, index) {
            var productDiv = document.createElement('div');
            productDiv.className = 'wishlist-item';
            productDiv.innerHTML = '<a href="' + product.url + '">' +
                '<img src="' + product.image + '" alt="' + product.name + '">' +
                '</a>' +
                '<p class="info-produs-wishlist"> ' + product.name + '</p>' +
                '<p class="info-produs-wishlist">Price: $' + product.price + '</p>' +
                '<button class="remove-btn" onclick="removeFromWishlist(' + index + ')"><i class="fa-solid fa-trash-can"></i></button>';
            wishlistItemsDiv.appendChild(productDiv);
        });
    } else if (wishlistItemsDiv !== null) {
        wishlistItemsDiv.textContent = 'Your wishlist is empty';
    }
}


function removeFromWishlist(index) {
    var wishlist = localStorage.getItem('wishlist');
    if (wishlist !== null) {
        wishlist = JSON.parse(wishlist);

        wishlist.splice(index, 1);

        localStorage.setItem('wishlist', JSON.stringify(wishlist));

        showWishlist(); 
    }
}

showWishlist();
