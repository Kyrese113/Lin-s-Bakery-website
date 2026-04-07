let cart = JSON.parse(localStorage.getItem("cart")) || [];
let total = 0;

// ADD TO CART
function addToCart(name, price) {
    let item = cart.find(i => i.name === name);

    if(item){
        item.qty++;
    } else {
        cart.push({name, price, qty:1});
    }

    saveCart();
    updateCart();
}

// UPDATE CART
function updateCart() {
    let list = document.getElementById("cartList");
    list.innerHTML = "";
    total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.qty;

        let li = document.createElement("li");
        li.innerHTML = `
        ${item.name} x${item.qty} - $${item.price * item.qty}
        <button onclick="removeItem(${index})">❌</button>
        `;

        list.appendChild(li);
    });

    document.getElementById("total").innerText = total;
}

// REMOVE ITEM
function removeItem(index){
    cart.splice(index,1);
    saveCart();
    updateCart();
}

// CLEAR CART
function clearCart(){
    cart = [];
    saveCart();
    updateCart();
}

// SAVE CART
function saveCart(){
    localStorage.setItem("cart", JSON.stringify(cart));
}

// SEARCH
function searchProducts(){
    let input = document.getElementById("search").value.toLowerCase();
    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        let name = card.dataset.name;
        card.style.display = name.includes(input) ? "block" : "none";
    });
}

// DARK MODE
function toggleDarkMode(){
    document.body.classList.toggle("dark");
}

// WHATSAPP ORDER
function sendWhatsApp(){
    let text = "Order:%0A";

    cart.forEach(item => {
        text += `${item.name} x${item.qty}%0A`;
    });

    let url = "https://wa.me/18680000000?text=" + text;
    window.open(url);
}

// LOAD CART ON START
updateCart();

// FORM VALIDATION
document.getElementById("orderForm").addEventListener("submit", function(e){
    let name = document.getElementById("name").value;
    let error = document.getElementById("error");

    if(name.length < 3){
        error.innerText = "Name must be at least 3 characters";
        e.preventDefault();
    } else {
        error.innerText = "Order submitted!";
    }
});