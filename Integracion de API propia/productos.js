const urlApi ="https://comercializadorall.grupoctic.com/ComercializadoraLL/API/apiProductos.php";

const cargarProductos=()=>{
    fetch(urlApi)
        .then(respuesta=> respuesta.json())
        .then(data => {
            const productos =data;
            
            console.log("productos recibidos:",productos);
            mostrarProductos(productos);
        })
        .catch(error=> {
            console.error("Error al cargar:",error);
            alert("Error al cargar la API.")
        })
}
const mostrarProductos = (productos) => {
    const contenedor = document.getElementById("contenedor-productos");
    contenedor.innerHTML="";

    if (productos.length ===0) {
        contenedor.innerHTML= "<p>No se encontraron productos disponibles</p>";
        return;
    }

productos.forEach(producto => {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("card-producto");

    let imagenSrc=`https://comercializadorall.grupoctic.com/ComercializadoraLL/img/${producto.vchImagen}`;

    tarjeta.innerHTML=`
    <img src="${imagenSrc}" alt="${producto.vchNombre}">
    <div class="card-content">
        <h3 class="titulo">${producto.vchNombre}</h3>
        <p class="descripcion">${producto.vchDescripcion}</p>

        <div class="destalles">
            <h3 class="precio">${producto.floPrecioUnitario}</p>
            <p class="stock">Disponibles: ${producto.intStock}</p>
        </div>
        <div class="extra-info">
            <span class="badge marca">${producto.vchMarca}</span>
            <span class="badge cat">${producto.vchCategoria}</span>
        </div>

        <p class="garantia">Garantia:  ${producto.vchCobertura}(${producto.intMeses_Cobertura} meses)</p>
        </div>
    `;
    contenedor.appendChild(tarjeta);
});
}
