const urlApi = "https://dummyjson.com/products";

const cargarProductos = () => {
    fetch(urlApi)
        .then(respuesta => respuesta.json())
        .then(data => {
            const productos = data.products;
            
            console.log("productos recibidos:", productos);
            mostrarProductos(productos);
        })
        .catch(error => {
            console.error("Error al cargar:", error);
            alert("Error al cargar la API de DummyJSON.");
        });
}

const mostrarProductos = (productos) => {
    const contenedor = document.getElementById("contenedor-productos");
    contenedor.innerHTML = "";

    if (!productos || productos.length === 0) {
        contenedor.innerHTML = "<p>No se encontraron productos disponibles</p>";
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

document.addEventListener('DOMContentLoaded', cargarProductos);