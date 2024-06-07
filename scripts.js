let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(bookName, price) {
    cart.push({ bookName, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Book added to cart');
}

function displayCart() {
    const cartItems = document.getElementById('cartItems');
    const totalAmount = document.getElementById('totalAmount');
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        cartItems.innerHTML += `<div>${item.bookName} - $${item.price.toFixed(2)} <button onclick="removeFromCart(${index})">Remove</button></div>`;
        total += item.price;
    });
    totalAmount.innerText = total.toFixed(2);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function placeOrder() {
    if (cart.length === 0) {
        alert('Your cart is empty.');
        return;
    }
    if (!sessionStorage.getItem('username')) {
        window.location.href = 'login.html';
        return;
    }
    fetch('php/place_order.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart, username: sessionStorage.getItem('username') })
    }).then(response => response.text()).then(data => {
        alert('Order placed successfully!');
        localStorage.removeItem('cart');
        window.location.href = 'index.html';
    });
}

function logout() {
    sessionStorage.removeItem('username');
    alert('You have been logged out.');
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('cartItems')) {
        displayCart();
        const username = sessionStorage.getItem('username');
        if (username) {
            document.getElementById('welcomeMessage').innerText = `Welcome, ${username}`;
        }
    }
});
