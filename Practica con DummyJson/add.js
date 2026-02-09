const guardarproducto = () => {
    const titulo = document.getElementById("titulo").value;
    const precio = document.getElementById("precio").value;
    const categoria = document.getElementById("categoria").value;
    const descripcion = document.getElementById("descripcion").value;
    const resultado = document.getElementById("mensaje-exito");

    if(!titulo || !precio || !descripcion) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    const producto = {
        title: titulo,
        price: parseFloat(precio),
        category: categoria,
        description: descripcion,
        thumbnail: "https://via.placeholder.com/150"
    };

    fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(producto)
    })
    .then(res => res.json())
    .then(data => {
        resultado.innerHTML = `
            <div style="color: green; margin-top: 20px; border: 1px solid green; padding: 10px;">
                <h3>¡Éxito!</h3>
                <p>Producto: ${data.title} (ID: ${data.id}) guardado correctamente.</p>
            </div>
        `;
    })
    .catch(err => console.error(err));
}