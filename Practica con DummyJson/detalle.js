const contenedor = document.getElementById("contenedor-detalle");

const urlParams = new URLSearchParams(window.location.search);
const productoId = urlParams.get('id');

const cargarDetalle = () => {
    if (!productoId) return;

    fetch(`https://dummyjson.com/products/${productoId}`)
        .then(res => res.json())
        .then(producto => {
            let opinionesHTML = producto.reviews.map(rev => `
                <div class="opinion-item">
                    <p><strong>${rev.reviewerName}</strong> (⭐ ${rev.rating})</p>
                    <p><em>"${rev.comment}"</em></p>
                </div>
            `).join('');

            contenedor.innerHTML = `
                <div class="detalle-wrapper">
                    <h2 class="producto-nombre">${producto.title}</h2>
                    
                    <img src="${producto.images[0]}" alt="${producto.title}" class="imagen-detalle">
                    
                    <p class="descripcion-detalle">${producto.description}</p>
                    
                    <p class="precio-detalle">Precio: $${producto.price}</p>
                    
                    <p class="marca-detalle">Marca: <strong>${producto.brand || 'No especificada'}</strong></p>
                    
                    <div class="opiniones-seccion">
                        <h3>Opiniones:</h3>
                        ${opinionesHTML || '<p>No hay opiniones aún.</p>'}
                    </div>
                </div>
            `;
        })
        .catch(err => {
            console.error("Error:", err);
            contenedor.innerHTML = "<h2>Error al cargar el producto</h2>";
        });
}

document.addEventListener('DOMContentLoaded', cargarDetalle);