const urlApi = "https://dummyjson.com/products?limit=0";
let todosLosProductos = [];

const cargarProductos = () => {
    fetch(urlApi)
        .then(respuesta => respuesta.json())
        .then(data => {
            todosLosProductos = data.products;
            mostrarProductos(todosLosProductos);
        })
        .catch(error => console.error("Error al cargar:", error));
}

const mostrarProductos = (productos) => {
    const contenedor = document.getElementById("contenedor-productos");
    contenedor.innerHTML = "";

    if (productos.length === 0) {
        contenedor.innerHTML = "<p>No se encontraron productos que coincidan con tu búsqueda.</p>";
        return;
    }

    productos.forEach(producto => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("card-producto");

        tarjeta.innerHTML = `
        <div class="card-content">
            <h3 class="titulo">${producto.title}</h3>
            <img src="${producto.thumbnail}" alt="${producto.title}">
            <div class="detalles">
                <p class="precio">$${producto.price}</p>
                <span class="badge cat">${producto.category}</span>
            </div>
            <div class="rating-info">
                <p class="rating">⭐ ${producto.rating}</p>
            </div>
            <a href="detalle.html?id=${producto.id}" class="btn-detalle">Ver Detalles</a>
        </div>
        `;
        contenedor.appendChild(tarjeta);
    });
}

const inputBusqueda = document.getElementById("input-busqueda");

inputBusqueda.addEventListener("input", () => {
    const texto = inputBusqueda.value.toLowerCase().trim();

    if (texto === "") {
        mostrarProductos(todosLosProductos);
    } else {
        const filtrados = todosLosProductos.filter(p => 
            p.title.toLowerCase().includes(texto)
        );
        mostrarProductos(filtrados);
    }
});

document.addEventListener('DOMContentLoaded', cargarProductos);