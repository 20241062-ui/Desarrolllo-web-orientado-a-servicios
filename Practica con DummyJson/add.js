const guardarproducto=() => {
    //alert("Producto guardado exitosamente");
    //Creamos las variables
    const titulo = document.getElementById("titulo").value;
    const precio = parseFloat(document.getElementById("precio").value);
    const categoria = document.getElementById("categoria").value;
    const descripcion = document.getElementById("descripcion").value;
    const resultado = document.getElementById("mensaje-exito");

    if(!titulo || !precio || !descripcion){
        alert("completa los campos obligatorios, no seas pendejo.");
        return;
    }

    // Crear objeto con los datos del producto
    const producto = {
        title: titulo,
        price: precio,
        category: categoria,
        description: descripcion,
        thumbnail: "https://dummyjson.com/image/400x200/008080/ffffff?text="+titulo
    };

    //hacemos la peticion
    fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(producto)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Producto agregado:', data);
        resultado.style.display = "block";
        resultado.innerHTML = `
        <strong><p class="text-success">Producto agregado correctamente.</p></strong><br>
        Id asignado: ${data.id}<br>
        nombre: ${data.title}<br>
        precio: $${data.price}.00<br>
        `;
    })
    .catch(error => {
        console.error('Error al agregar producto:', error);
        resultado.innerHTML = '<p class="text-danger">Error al agregar producto.</p>';
    });
}