const inputArchivo = document.getElementById('inputArchivo');
const botonSubir = document.getElementById('botonSubir');
const contenedorVistaPrevia = document.getElementById('contenedorVistaPrevia');
const imagenVistaPrevia = document.getElementById('imagenVistaPrevia');
const indicadorCargando = document.getElementById('indicadorCargando');
const mensajeError = document.getElementById('mensajeError');
const contenedorResultado = document.getElementById('contenedorResultado');
const imagenResultado = document.getElementById('imagenResultado');
const enlaceResultado = document.getElementById('enlaceResultado');
const textoUrl = document.getElementById('textoUrl');

const NOMBRE_DE_NUBE = 'dkxdwqsfi';
const PRESET_DE_SUBIDA = 'Preset_G0D';
const URL_CLOUDINARY = `https://api.cloudinary.com/v1_1/${NOMBRE_DE_NUBE}/image/upload`;

inputArchivo.addEventListener('change', (evento) => {
    mensajeError.textContent = '';

    const archivoSeleccionado = evento.target.files[0];

    if (archivoSeleccionado) {
        if (!archivoSeleccionado.type.startsWith('image/')) {
            mensajeError.textContent = 'Error: Por favor, selecciona un archivo de imagen válido (JPG, PNG, etc.).';
            botonSubir.disabled = true;
            contenedorVistaPrevia.classList.add('hidden');
            return;
        }

        const lectorDeArchivos = new FileReader();
        lectorDeArchivos.onload = (eventoDeLectura) => {
            imagenVistaPrevia.src = eventoDeLectura.target.result;
            contenedorVistaPrevia.classList.remove('hidden');
        };
        lectorDeArchivos.readAsDataURL(archivoSeleccionado);

        botonSubir.disabled = false;
    } else {
        botonSubir.disabled = true;
        contenedorVistaPrevia.classList.add('hidden');
    }
});

botonSubir.addEventListener('click', () => {
    const archivoParaSubir = inputArchivo.files[0];
    if (!archivoParaSubir) return;

    botonSubir.disabled = true;
    inputArchivo.disabled = true;
    indicadorCargando.classList.remove('hidden');
    mensajeError.textContent = '';
    contenedorResultado.classList.add('hidden');

    const datosDelFormulario = new FormData();
    datosDelFormulario.append('file', archivoParaSubir);
    datosDelFormulario.append('upload_preset', PRESET_DE_SUBIDA);

    fetch(URL_CLOUDINARY, {
        method: 'POST',
        body: datosDelFormulario
    })
        .then(respuestaDelServidor => {
            if (!respuestaDelServidor.ok) {
                throw new Error(`Error en el servidor: ${respuestaDelServidor.status} ${respuestaDelServidor.statusText}`);
            }
            return respuestaDelServidor.json();
        })
        .then(datosRecibidos => {
            console.log('Respuesta de Cloudinary:', datosRecibidos);

            imagenResultado.src = datosRecibidos.secure_url;
            enlaceResultado.href = datosRecibidos.secure_url;

            textoUrl.textContent = datosRecibidos.secure_url;

            contenedorResultado.classList.remove('hidden');
        })
        .catch(errorGenerado => {
            console.error('Fallo en la subida:', errorGenerado);
            mensajeError.textContent = 'Ocurrió un error al subir la imagen. Revisa tu conexión a internet o la configuración del servicio.';
        })
        .finally(() => {
            botonSubir.disabled = false;
            inputArchivo.disabled = false;
            indicadorCargando.classList.add('hidden');
        });
});