let lat
let lon

    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (respuesta)=>{
            lat=respuesta.coords.latitude
            lon=respuesta.coords.longitude

            const coordenadas=[lat,lon]

            let map = L.map('map').setView(coordenadas, 19);
            let marker = L.marker(coordenadas).addTo(map);
            marker.bindPopup("<b>Estoy en la escuela</b><br>FUGAAAAAA!!!!!! <br>Mis coordenadas son Latitud: "+lat+"<br>Longitud: "+lon).openPopup();

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
        },
        ()=>{

        })
}else{

}