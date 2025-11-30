// Products data
const products = [
  {name: "Dark Chocolate", price: 200, flavor:"dark", image:"dark.jpg"},
  {name: "Milk Chocolate", price: 180, flavor:"milk", image:"milk.jpeg"},
  {name: "Chocolate Truffles", price: 300, flavor:"dark", image:"truffle.jpeg"},
  {name: "Chocolate Cupcake", price: 150, flavor:"milk", image:"cup.jpeg"},
  {name: "Gift Box", price: 500, flavor:"all", image:"gift.jpeg"},
  {name: "Assorted Chocolates", price: 400, flavor:"all", image:"assorted.jpeg"},
  {name: "Chocolate Cookies", price: 100, flavor:"milk", image:"cookies.jpeg"},
  {name: "Hot Chocolate", price: 120, flavor:"milk", image:"hot.jpeg"},
];

// Load cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update cart count
function updateCartCount() {
    document.querySelectorAll("#cart-count").forEach(el=>{
        el.innerText = cart.length;
    });
}

// Add to cart
function addToCart(name, price, image){
    cart.push({name, price, image});
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert("Added to cart!");
}

// Load products
function loadProducts() {
    const container = document.getElementById("product-list");
    if(!container) return;
    container.innerHTML = "";
    products.forEach((p,i)=>{
        container.innerHTML += `
        <div class="product" data-flavor="${p.flavor}">
          <img src="${p.image}" alt="${p.name}">
          <h3>${p.name}</h3>
          <p>₹${p.price}</p>
          <button onclick="addToCart('${p.name}',${p.price},'${p.image}')">Add to Cart</button>
        </div>`;
    });
}

// Search function
function searchProducts() {
    const value = document.getElementById("search").value.toLowerCase();
    document.querySelectorAll(".product").forEach(p=>{
        const name = p.querySelector("h3").innerText.toLowerCase();
        p.style.display = name.includes(value) ? "block" : "none";
    });
}

// Filter by flavor
function filterProducts() {
    const flavor = document.getElementById("filter-flavor").value;
    document.querySelectorAll(".product").forEach(p=>{
        p.style.display = (flavor=="all" || p.dataset.flavor==flavor) ? "block" : "none";
    });
}

// Load cart page
function loadCartPage() {
    const cartItems = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");
    if(!cartItems) return;
    cartItems.innerHTML = "";
    let total = 0;
    cart.forEach(item=>{
        total += item.price;
        cartItems.innerHTML += `
        <div class="cart-item">
          <img src="${item.image}">
          <div class="cart-details">
            <h3>${item.name}</h3>
            <p>₹${item.price}</p>
          </div>
        </div>`;
    });
    totalPrice.innerText = total;
}

// Place order
function placeOrder(){
    localStorage.removeItem("cart");
    cart=[];
    updateCartCount();
    window.location.href = "order.html";
}

// Initialize
window.onload = ()=>{
    updateCartCount();
    loadProducts();
    loadCartPage();
};
