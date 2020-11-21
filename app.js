//Punktanir
var userPoint;
var Destination;

//Lína á milli punktana
var polyline;


var greenIcon = new L.Icon({iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png', shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]});

var map = L.map('mapid', { zoomControl: false, attributionControl: false }).fitWorld();
map.locate({setView: true, maxZoom: 16});

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' + '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' + 'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',    
    id: 'mapbox/streets-v11',
    maxZoom: 18,
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);

var searchControl = new L.esri.Controls.Geosearch().addTo(map);
var results = new L.LayerGroup().addTo(map);

searchControl.on('results', function(data){
    results.clearLayers();
    for (var i = data.results.length - 1; i >= 0; i--) {
        Destination = L.marker(data.results[i].latlng, {icon: greenIcon});
        results.addLayer(Destination);
        CreateLine();
    }
});

function UserLocation(e) {
    var radius = e.accuracy;

    //Býr til marker þar sem notandinn er staðsettur
    userPoint = L.marker(e.latlng).addTo(map);
    //L.circle(e.latlng, radius).addTo(map);
}

//Error ef notandinn finnst ekki
function UserNotFound(e) { alert(e.message); }

map.on('locationfound', UserLocation);
map.on('locationerror', UserNotFound);

document.getElementsByClassName('geocoder-control-input leaflet-bar')[0].placeholder = "Leita af staðsetningu";

function CreateLine(){
    if(polyline) map.removeLayer(polyline)
    polyline = L.polyline([userPoint.getLatLng(), Destination.getLatLng()], {color: 'red'}).addTo(map);

    //hreyfir sjónina þína svo því getur séð báða punktana á kortinu
    map.fitBounds(L.latLngBounds([userPoint, Destination].map(marker => marker.getLatLng())))
}




/*var popup = L.popup();

function onMapClick(e) {
    console.log(e.latlng)
    L.marker([51.5, -0.09]).addTo(map).bindPopup("<b>Endapunktur</b>").openPopup();

	popup
		.setLatLng(e.latlng)
		.setContent("You clicked the map at " + e.latlng.toString())
		.openOn(mymap);
}

map.on('click', onMapClick);*/

