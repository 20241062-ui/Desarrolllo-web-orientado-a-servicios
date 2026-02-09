let skip = 0;
const limit = 10;
let busquedaActual = "";
let categoriaActual = "";
let ordenActual = "asc";

const cargarProductos = () => {
    let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}&sortBy=price&order=${ordenActual}`;
    
    if (busquedaActual) {
        url = `https://dummyjson.com/products/search?q=${busquedaActual}&limit=${limit}&skip=${skip}`;
    } else if (categoriaActual) {
        url = `https://dummyjson.com/products/category/${categoriaActual}?limit=${limit}&skip=${skip}`;
    }

    fetch(url)
        .then(res => res.json())
        .then(data => renderizarTabla(data.products, data.total));
}

const renderizarTabla = (productos, total) => {
    const cuerpo = document.getElementById("cuerpo-tabla");
    cuerpo.innerHTML = "";

    productos.forEach(p => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${p.id}</td>
            <td><img src="${p.thumbnail}" class="img-tabla"></td>
            <td id="title-${p.id}">${p.title}</td>
            <td id="price-${p.id}">$${p.price}</td>
            <td><span class="badge cat">${p.category}</span></td>
            <td>
                <button class="btn-edit" onclick="editarProducto(${p.id})">Editar</button>
                <button class="btn-delete" onclick="eliminarProducto(${p.id}, this)">Eliminar</button>
            </td>
        `;
        cuerpo.appendChild(fila);
    });

    document.getElementById("info-paginacion").innerText = `Pag: ${(skip/limit)+1} de ${Math.ceil(total/limit)}`;
    document.getElementById("btn-prev").disabled = skip === 0;
    document.getElementById("btn-next").disabled = (skip + limit) >= total;
}


const editarProducto = (id) => {
    const nuevoTitulo = prompt("Nuevo nombre del producto:");
    const nuevoPrecio = prompt("Nuevo precio:");

    if (nuevoTitulo && nuevoPrecio) {
        fetch(`https://dummyjson.com/products/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: nuevoTitulo, price: parseFloat(nuevoPrecio) })
        })
        .then(res => res.json())
        .then(data => {
            alert("Producto actualizado con éxito (Simulación)");
            document.getElementById(`title-${id}`).innerText = data.title;
            document.getElementById(`price-${id}`).innerText = `$${data.price}`;
        });
    }
}

const eliminarProducto = (id, boton) => {
    if(confirm("¿Estás seguro de eliminar el producto #" + id + "?")) {
        fetch(`https://dummyjson.com/products/${id}`, { method: 'DELETE' })
        .then(res => res.json())
        .then(() => {
            alert("Producto eliminado correctamente");
            boton.closest("tr").remove();
        });
    }
}

document.getElementById("input-busqueda").addEventListener("keypress", (e) => {
    if(e.key === 'Enter') {
        busquedaActual = e.target.value;
        skip = 0;
        cargarProductos();
    }
});

document.getElementById("select-orden").addEventListener("change", (e) => {
    ordenActual = e.target.value;
    cargarProductos();
});

const cambiarPagina = (paso) => {
    skip += (paso * limit);
    cargarProductos();
}

const init = async () => {
    const res = await fetch('https://dummyjson.com/products/category-list');
    const cats = await res.json();
    const select = document.getElementById("select-categoria");
    cats.forEach(c => {
        const opt = document.createElement("option");
        opt.value = c; opt.innerText = c;
        select.appendChild(opt);
    });
    cargarProductos();
}

document.getElementById("select-categoria").addEventListener("change", (e) => {
    categoriaActual = e.target.value;
    skip = 0;
    cargarProductos();
});

init();