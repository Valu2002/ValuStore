function addToCart(name, price, image, url) {
    var product = {
        "name": name,
        "price": price.toFixed(2),
        "image": image,
        "url": url,
        "quantity": 1
    };

    var cart = localStorage.getItem('cart');
    if (cart === null) {
        cart = [];
    } else {
        cart = JSON.parse(cart);
    }

    var existingProduct = cart.find(item => item.name === name);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    alert('Product added to cart!');
}
