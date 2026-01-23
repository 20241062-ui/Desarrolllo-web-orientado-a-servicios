const coordenadas =document.getElementById("parrafo")
const enlace =document.getElementById("enlace")

const obtener =() =>{
    //verificamos que el navegador tenga soporte para geolocalizacion
if (navigator.geolocation) {
    coordenadas.innerText="Localizando..."

    navigator.geolocation.getCurrentPosition(
    (position)=>{
        const longitud=position.coords.longitude
        const latitud=position.coords.latitude
        
        coordenadas.innerText="Latitud: "+latitud+"   Longitud:"+longitud

        enlace.href="https://www.google.com/maps?q="+latitud+","+longitud

        enlace.style.display="block"
    },
    (error)=>{
        coordenadas.innerText="No se pudo obtener la ubicacion"
    }
)
}else{

}
}