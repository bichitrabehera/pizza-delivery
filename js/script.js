// Function to update the cart count in the header
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cart-count").innerText = cart.length;
}

// Function to add items to cart
function addToCart(button) {
    let card = button.closest(".pizza-card");
    let name = card.dataset.name;
    let price = parseFloat(card.dataset.price);

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount(); // Update the cart count after adding an item
    alert(name + " added to cart!");
}

// Function to load cart items
function loadCart() {
    let cartList = document.getElementById("cart-list");
    let totalPriceElement = document.getElementById("total-price");
    
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartList.innerHTML = "";
    
    let total = 0;
    cart.forEach((item, index) => {
        let itemElement = document.createElement("div");
        itemElement.classList.add("cart-item");
        itemElement.innerHTML = `
            <p>${item.name} - $${item.price.toFixed(2)}</p>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartList.appendChild(itemElement);
        total += item.price;
    });

    totalPriceElement.innerText = "Total: $" + total.toFixed(2);
    updateCartCount(); // Update cart count when loading cart
}

// Function to remove item from cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

// Ensure cart count is updated on all pages
document.addEventListener("DOMContentLoaded", updateCartCount);
if (window.location.pathname.includes("cart.html")) {
    document.addEventListener("DOMContentLoaded", loadCart);
}
