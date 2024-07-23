//Array bidensional para almacenar los productos disponibles
const products = [
    //Lista de productos en el siguiente formato:[ID,Nombre,Precio,Ruta de Imagen]
    [1, "", 1000, "imagenes/vestido1.jpg"],
    [2, "", 1000, "imagenes/vestido2.jpg"],
    [3, "", 1000, "imagenes/vestido3.jpg"],
    [4, "", 1000, "imagenes/vestido4.jpg"],
    [5, "", 1000, "imagenes/vestido5.webp"],
    [6, "", 1000, "imagenes/vestido6.jpg"],
    [7, "", 1000, "imagenes/vestido7.jpg"],
    [8, "", 1000, "imagenes/vestido8.jpg"]
];
//Array para almacenar los productos agregados al carrito
const cardItems = [];
//Funcion para mostrar los productos disponibles en la pagina
function displayProducts() {
    const productListDiv = document.getElementById("padre")//seleccionar contenedor
    console.log(productListDiv)
    products.forEach((product) => {
        const productCard = document.createElement("div");//Agregamos una clase para el estilo css
        productCard.className = "product-card"
        productCard.innerHTML = `
     <img src="${product[3]}" alt="${product[1]}">
  <div>
    <h4>${product[1]}</h4>
    <p>Precio:$${product[2].toFixed(2)}</p>
    <div class="quantity-input">
        <label for="quantity-${product[0]}">Cantidad:</label>
        <input type="number" id="quantity-${product[0]}" min="1" value="1">
    </div>
    <button onclick="addToCart(${product[0]})">Agregar al Carrito</button>
    </div>`;//Creamos el contenido HTML para mostrar la informacion del producto
        productListDiv.appendChild(productCard);//Agregamos el producto al contenedor
    })
}
displayProducts()
//Funcion para agregar productos al carrito con la cantidad especificada por el usuario
function addToCart(productId) {
    const quantityInput = document.getElementById(`quantity-${productId}`);
    const quantity = parseInt(quantityInput.value);
    const productToAdd = products.find((product) => product[0] === productId);
    if (productToAdd && quantity > 0) {
        for (let i = 0; i < quantity; i++) {
            cardItems.push(productToAdd);
        }
        //updateCart();        
    }

}
function updateCart() {
    const cardItemsList = document.getElementById("cart-items");//Selleciona el contenedor
    cardItemsList.innerHTML = " ";//Limpia el contenido actual del carrito
    //Obtenemos un array con los ultimos ID unicos de los prodcutos presentes del carrito
    const uniqueProduct = [...new Set(cardItems.map((item) => item[0]))];
    //iteramos sobre los id unicos y mostramos la informacion de cada producto en el carrito
    uniqueProduct.forEach((productId) => {
        const product = products.find((p) => p[0] === productId);
        const quantity = cardItems.filter((item) => item[0] === productId).length;
        const subtotal = getSubtotal(product);//obtenemos el subtotal del producto

        const li = document.createElement("li")
        li.textContent = `${product[1]}-$${product[2].toFixed(2)}-Cantidad:${quantity}-Subtotal$${subtotal}`
        cardItems.appendChild(li);
    })
    const totalDiv = document.getElementById("total")
    totalDiv.textContent = `Total a pagar:$${calculateTotal()}`
    //carrito
    document.getElementById("total-items-cart").textContent = cardItems.length
}
function getSubtotal(product) {
    const quantity = cardItems.filter((item) => item[0] === product[0]).length
    return (quantity * product[2]).toFixed(2);
}
function calculateTotal() {
    let total = 0;
    cardItems.forEach((item) => {
        total += item[2];

    });
    return total.toFixed(2);
}

