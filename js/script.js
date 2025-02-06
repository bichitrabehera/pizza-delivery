// Function to update the cart count in the header
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cart-count").innerText = cart.length;
}

// Function to add items to the cart
function addToCart(button) {
    let card = button.closest(".pizza-card");
    let name = card.dataset.name;
    let price = parseFloat(card.dataset.price);

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if item already exists
    let itemIndex = cart.findIndex(item => item.name === name);
    if (itemIndex !== -1) {
        cart[itemIndex].quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert(name + " added to cart!");
}

// Function to load cart items
function loadCart() {
    let cartList = document.getElementById("cart-list");
    let totalPriceElement = document.getElementById("total-price");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartList.innerHTML = "";

    let total = 0;
    if (cartList == null) {
        totalPriceElement.innerHTML = "Cart Is empty"
    }
    cart.forEach((item, index) => {
        let itemElement = document.createElement("div");
        itemElement.classList.add("cart-item");
        itemElement.innerHTML = `
            <p>${item.name} - $${item.price.toFixed(2)}</p>
            <div class="cart-controls">
                <button onclick="decreaseQuantity(${index})">-</button>
                <span>${item.quantity}</span>
                <button onclick="increaseQuantity(${index})">+</button>
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
        cartList.appendChild(itemElement);
        total += item.price * item.quantity;
    });

    totalPriceElement.innerText = "Total: $" + total.toFixed(2);
    updateCartCount();
}
// Function to increase quantity
function increaseQuantity(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].quantity += 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
    updateCartCount(); // Update cart count after change
}

// Function to decrease quantity
function decreaseQuantity(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1); // Remove item if quantity is 0
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
    updateCartCount(); // Update cart count after change
}

// Function to remove item from cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
    updateCartCount(); // Update cart count after change
}


// Ensure cart count is updated on all pages
document.addEventListener("DOMContentLoaded", updateCartCount);
if (window.location.pathname.includes("cart.html")) {
    document.addEventListener("DOMContentLoaded", loadCart);
}
