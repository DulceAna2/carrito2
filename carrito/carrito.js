//Array para almacenar imagenes de ofertas
const ofertas= [
    [1, "Sale", "imagenes/sale.png"],
    [2, "20", "imagenes/20.png"],
    [3, "30","imagenes/30.png"],
    [4, "40", "imagenes/40.png"],
    [5, "50", "imagenes/50.png"],
]
function paginaoferta() {
    const productListaDiv = document.getElementById("ofertas");//Buscar contenedor
    //Recorre cada elemento del array oferta
    ofertas.forEach((producto) => {
        const ProductoCarta = document.createElement("div");//Crear div
        ProductoCarta.innerHTML = `
         <img src="${producto[2]}" alt="${producto[1]}" class="ofertas">`;
        productListaDiv.appendChild(ProductoCarta);
    });
}
// Array bidimensional para almacenar los productos disponibles
const Mercancia = [
    [1, "Vestido 1", 1000, "imagenes/vestido1.jpg"],
    [2, "Vestido 2", 1000, "imagenes/vestido2.jpg"],
    [3, "Vestido 3", 1000, "imagenes/vestido3.jpg"],
    [4, "Vestido 4", 1000, "imagenes/vestido4.jpg"],
    [5, "Vestido 5", 1000, "imagenes/vestido5.webp"],
    [6, "Vestido 6", 1000, "imagenes/vestido6.jpg"],
    [7, "Vestido 7", 1000, "imagenes/vestido7.jpg"],
    [8, "Vestido 8", 1000, "imagenes/vestido8.jpg"],
    [9, "Vestido 9", 1000, ""],
    [10, "Vestido 10", 1000, ""],
    [11, "Vestido 11", 1000, ""],
    [12, "Vestido 12", 1000, ""],
    [13, "Vestido 13", 1000, ""],
    [14, "Vestido 14", 1000, ""],
    [15, "Vestido 15", 1000, ""]
];
// Array para almacenar los productos agregados al carrito
const carrito = [];
// Función para mostrar los productos en la página
function displayProducts() {
    const productListaDiv = document.getElementById("padre");//Buscar contenedor
    //Recorre cada elemento del array Mercancia
    Mercancia.forEach((producto) => {
        const ProductoCarta = document.createElement("div");//Crear div
        ProductoCarta.className = "product-card";//Agregar clase a carta
        ProductoCarta.innerHTML = `
            <img src="${producto[3]}" alt="${producto[1]}" >
            <div>
                <h4>${producto[1]}</h4>
                <p>Precio: $${producto[2].toFixed(2)}</p>
                <div class="quantity-input">
                    <label for="quantity-${producto[0]}">Cantidad:</label>
                    <input type="number" id="quantity-${producto[0]}" min="1" value="1">
                </div>
                <button onclick="addToCart(${producto[0]})">Agregar al Carrito</button>
            </div>`;
        productListaDiv.appendChild(ProductoCarta);
    });
}
//Función para agregar productos al carrito con la cantidad especificada por el usuario
function addToCart(productId) {
    const quantityInput = document.getElementById(`quantity-${productId}`);
    const quantity = parseInt(quantityInput.value);
    const productToAdd = Mercancia.find((producto) => producto[0] === productId);//find devuelve el valor del primer elemento del array 
    if (productToAdd && quantity > 0) {
        const IndiceProducto = carrito.findIndex(item => item.id === productId);
        if (IndiceProducto >= 0) {
            carrito[IndiceProducto].quantity += quantity;
        } else {
            //Definir elementos
            carrito.push({
                id: productId,
                nombre: productToAdd[1],
                precio: productToAdd[2],
                quantity: quantity//Cantidad
            });
        }
        updateCart();
    }
}
//Actualizar el carrito y mostrarlo
function updateCart() {
    const ListaCarrito = document.getElementById("cart-items");
    ListaCarrito.innerHTML = "";
    carrito.forEach((item) => {
        const li = document.createElement("li");//Crear li
        const subtotal = (item.quantity * item.precio).toFixed(2);//Calcular subtotal
        //Agregar cantidad, subtotal y nnombre del producto al carro
        li.textContent = `${item. nombre} - $${item.precio.toFixed(2)} - Cantidad: ${item.quantity} - Subtotal: $${subtotal}`;
        ListaCarrito.appendChild(li);//Agregar li en carrito
    });
    //Espacio para agregar el total
    const totalDiv = document.getElementById("total");
    totalDiv.textContent = `Total a pagar: $${calculateTotal()}`;
}
//Calcular el total a pagar
function calculateTotal() {
    let total = 0;
    carrito.forEach((item) => {
        total += item.precio * item.quantity;
    });
    return total.toFixed(2);
}
//Mostrar los productos
displayProducts();
//Que se ejecute la funcion para mostrar ofertas
paginaoferta()

/*Terminos:
push:Añade uno o más elementos al final de un array y devuelve la nueva longitud del array
find:Devuelve el valor del primer elemento del array 
 */
