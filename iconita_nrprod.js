function updateCartCount() {
    var cart = localStorage.getItem('cart');
    var totalItems = 0;
    if (cart !== null) {
        cart = JSON.parse(cart);
        cart.forEach(function (product) {
            totalItems += product.quantity;
        });
    }
    var cartCount = document.getElementById('cartCount');
    if (totalItems >= 10) {
        cartCount.textContent = '+9';
    } else {
        cartCount.textContent = totalItems;
    }
}

function removeFromCart(index) {
    var cart = localStorage.getItem('cart');
    if (cart !== null) {
        cart = JSON.parse(cart);

        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
        } else {
            cart.splice(index, 1);
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        showCart();
        showTotal();
        updateCartCount();
    }
}

function showCart() {
    var cart = localStorage.getItem('cart');
    if (cart !== null) {
        cart = JSON.parse(cart);
        var cartItemsDiv = document.getElementById('cart-items');
        cartItemsDiv.innerHTML = '';

        cart.forEach(function (product, index) {
            var productDiv = document.createElement('div');
            productDiv.classList.add('cart-item');
            productDiv.innerHTML = '<a href="' + product.url + '">' +
                '<img src="' + product.image + '" alt="' + product.name + '">' +
                '</a>' +
                '<p class="info-produs-cart">' + product.name + '</p>' +
                '<p class="info-produs-cart">Price: $' + product.price + '</p>' +
                '<p class="info-produs-cart">Quantity: ' + product.quantity + '</p>' +
                '<button class="remove-btn" onclick="removeFromCart(' + index + ')"><i class="fa-solid fa-trash-can"></i></button>';
            cartItemsDiv.appendChild(productDiv);
        });
    } else {
        var emptyCartDiv = document.createElement('div');
        emptyCartDiv.textContent = 'Your cart is empty';
        document.body.appendChild(emptyCartDiv);
    }
}

function calculateTotal() {
    var cart = localStorage.getItem('cart');
    var total = 0;
    if (cart !== null) {
        cart = JSON.parse(cart);
        cart.forEach(function (product) {
            total += parseFloat(product.price) * product.quantity;
        });
    }
    return total.toFixed(2);
}

function showTotal() {
    var totalDiv = document.getElementById('cart-total');
    var total = calculateTotal();
    totalDiv.innerHTML = '<p>Total: $' + total + '</p>';
}

updateCartCount();
showCart();
showTotal();
