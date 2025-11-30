// Load Cart From LocalStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add To Cart
function addToCart(name, price, image) {
    const product = { name, price, image };
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
}

// Display Cart Items (cart.html)
function loadCart() {
    const cartBox = document.getElementById("cart-items");
    const totalBox = document.getElementById("total");

    if (!cartBox) return;

    cartBox.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price;

        cartBox.innerHTML += `
        <div class="cart-item">
            <img src="${item.image}" />
            <div class="cart-details">
                <h3>${item.name}</h3>
                <p>₹${item.price}</p>
            </div>
        </div>`;
    });

    totalBox.innerHTML = "Total Amount: ₹" + total;
}

// Search + Filter (products.html)
function searchProducts() {
    const input = document.getElementById("search").value.toLowerCase();
    const items = document.querySelectorAll(".product");

    items.forEach(item => {
        const name = item.querySelector("h3").innerText.toLowerCase();
        item.style.display = name.includes(input) ? "block" : "none";
    });
}

// Filter by category
function filterCategory() {
    const category = document.getElementById("category").value;
    const items = document.querySelectorAll(".product");

    items.forEach(item => {
        const cat = item.getAttribute("data-category");
        item.style.display = category === "all" || category === cat ? "block" : "none";
    });
}

window.onload = loadCart;
