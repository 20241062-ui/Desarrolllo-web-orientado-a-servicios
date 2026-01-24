let lat
let lon

    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        ()=>{
            lat=21.056211
            lon=-98.506523

            const coordenadas=[lat,lon]

            let map = L.map('map').setView(coordenadas, 30
            );
            let marker = L.marker(coordenadas).addTo(map);
            marker.bindPopup("<b>Estoy en mi casa</b><br>Hace frio <br>Mis coordenadas son: <br>Latitud: "+lat+"<br>Longitud: "+lon).openPopup();

            var polygon = L.polygon([
            [21.056278, -98.506535],
            [21.056230, -98.506469],
            [21.056180, -98.506512],
            [21.056217, -98.506562],
            [21.056227, -98.506553],
            [21.056242, -98.506570],
            [21.056278, -98.506535]
            ]).addTo(map);

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
        },
        ()=>{

        })
}else{

}