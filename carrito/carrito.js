// Array bidimensional para almacenar los productos disponibles
const products = [
    [1, "Vestido 1", 1000, "imagenes/vestido1.jpg"],
    [2, "Vestido 2", 1000, "imagenes/vestido2.jpg"],
    [3, "Vestido 3", 1000, "imagenes/vestido3.jpg"],
    [4, "Vestido 4", 1000, "imagenes/vestido4.jpg"],
    [5, "Vestido 5", 1000, "imagenes/vestido5.webp"],
    [6, "Vestido 6", 1000, "imagenes/vestido6.jpg"],
    [7, "Vestido 7", 1000, "imagenes/vestido7.jpg"],
    [8, "Vestido 8", 1000, "imagenes/vestido8.jpg"]
];

// Array para almacenar los productos agregados al carrito
const cartItems = [];

// Función para mostrar los productos disponibles en la página
function displayProducts() {
    const productListDiv = document.getElementById("padre");
    products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";
        productCard.innerHTML = `
            <img src="${product[3]}" alt="${product[1]}">
            <div>
                <h4>${product[1]}</h4>
                <p>Precio: $${product[2].toFixed(2)}</p>
                <div class="quantity-input">
                    <label for="quantity-${product[0]}">Cantidad:</label>
                    <input type="number" id="quantity-${product[0]}" min="1" value="1">
                </div>
                <button onclick="addToCart(${product[0]})">Agregar al Carrito</button>
            </div>`;
        productListDiv.appendChild(productCard);
    });
}

// Función para agregar productos al carrito con la cantidad especificada por el usuario
function addToCart(productId) {
    const quantityInput = document.getElementById(`quantity-${productId}`);
    const quantity = parseInt(quantityInput.value);
    const productToAdd = products.find((product) => product[0] === productId);

    if (productToAdd && quantity > 0) {
        const existingProductIndex = cartItems.findIndex(item => item.id === productId);
        if (existingProductIndex >= 0) {
            cartItems[existingProductIndex].quantity += quantity;
        } else {
            cartItems.push({ id: productId, name: productToAdd[1], price: productToAdd[2], quantity: quantity });
        }
        updateCart();
    }
}

// Función para actualizar el carrito y mostrarlo
function updateCart() {
    const cartItemsList = document.getElementById("cart-items");
    cartItemsList.innerHTML = "";

    cartItems.forEach((item) => {
        const li = document.createElement("li");
        const subtotal = (item.quantity * item.price).toFixed(2);
        li.textContent = `${item.name} - $${item.price.toFixed(2)} - Cantidad: ${item.quantity} - Subtotal: $${subtotal}`;
        cartItemsList.appendChild(li);
    });

    const totalDiv = document.getElementById("total");
    totalDiv.textContent = `Total a pagar: $${calculateTotal()}`;
}

// Función para calcular el total a pagar
function calculateTotal() {
    let total = 0;
    cartItems.forEach((item) => {
        total += item.price * item.quantity;
    });
    return total.toFixed(2);
}

// Llamada inicial para mostrar los productos
displayProducts();


