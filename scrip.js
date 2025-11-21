// Selección de elementos principales del DOM
const carrito = document.getElementById("carrito");
const elementos1 = document.getElementById("lista-1");
const lista = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");

// Cargar eventos
cargarEventListeners();

function cargarEventListeners() {
    // Agregar producto al carrito
    elementos1.addEventListener("click", comprarElemento);
    // Eliminar producto del carrito
    carrito.addEventListener("click", eliminarElemento);
    // Vaciar todo el carrito
    vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
}

// -----------------------------------------------
// FUNCIONES PRINCIPALES
// -----------------------------------------------

// Detecta clic en "Agregar al carrito"
function comprarElemento(e) {
    e.preventDefault();

    if (e.target.classList.contains("agregar-carrito")) {
        const elemento = e.target.closest(".products"); // ✅ más seguro
        leerDatosElemento(elemento);
    }
}

// Lee los datos del producto seleccionado
function leerDatosElemento(elemento) {
    const infoElemento = {
        imagen: elemento.querySelector("img").src,
        titulo: elemento.querySelector("h3").textContent,
        precio: elemento.querySelector(".precio").textContent,
        id: elemento.querySelector("a").getAttribute("data-id")
    };

    insertarCarrito(infoElemento);
}

// Inserta un producto dentro del carrito (en la tabla)
function insertarCarrito(elemento) {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td><img src="${elemento.imagen}" width="100"></td>
        <td>${elemento.titulo}</td>
        <td>${elemento.precio}</td>
        <td><a href="#" class="borrar" data-id="${elemento.id}">x</a></td>
    `;

    lista.appendChild(row);
}

// Elimina un producto individual del carrito
function eliminarElemento(e) {
    e.preventDefault();

    if (e.target.classList.contains("borrar")) {
        e.target.closest("tr").remove(); // ✅ elimina la fila completa
    }
}

// Vacía el carrito completamente
function vaciarCarrito() {
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }
    return false;
}
