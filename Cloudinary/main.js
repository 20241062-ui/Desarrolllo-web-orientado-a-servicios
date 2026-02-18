const CLOUD_NAME = "dkxdwqsfi";
const PRESET = "Preset_G0D";

const fileInput = document.getElementById('fileinput');
const imagePreview = document.getElementById('imagen');
const btnUpload = document.getElementById('btnUpload');

btnUpload.addEventListener('click', () => {
    
    const file = fileInput.files[0];

    if (!file) {
        alert("¡Oye! No has seleccionado ninguna imagen.");
        return;
    }

    btnUpload.innerText = "Subiendo...";
    btnUpload.disabled = true;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', PRESET);

    fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Error en la respuesta del servidor");
        }
        return response.json();
    })
    .then(data => {
        console.log("Éxito:", data);
        
        imagePreview.src = data.secure_url;
        imagePreview.classList.remove('hidden');
        
        alert("¡Imagen guardada en la nube correctamente!");
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Hubo un error al subir la imagen. Revisa la consola.");
    })
    .finally(() => {
        btnUpload.innerText = "Cargar Imagen";
        btnUpload.disabled = false;
        fileInput.value = ""; 
    });
});