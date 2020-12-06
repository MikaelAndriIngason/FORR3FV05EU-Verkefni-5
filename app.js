//Punktanir
var userPoint;
var Destination;

//Lína á milli punktana
var polyline;


var showdist = false;

var distancetext = document.getElementById("distext");



var greenIcon = new L.Icon({iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png', shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]});

var map = L.map('mapid', { zoomControl: false, attributionControl: false }).fitWorld();
//map.locate({setView: true, maxZoom: 16});

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

function GetLatAndLng(position){
    let latAndLng = position.getLatLng().toString().match(/[^(]+(?=\))/g) + "";
    latAndLng = latAndLng.split(',').map(x=>+x);

    return latAndLng;
}

//Error ef notandinn finnst ekki
function UserNotFound(e) { alert(e.message); }

map.on('locationfound', UserLocation);
map.on('locationerror', UserNotFound);

//map.locate({setView: true, watch: true});

map.locate({
    setView: true,
    maxZoom: 1200
  }).on("locationfound", e => {
      if (!userPoint) {
            userPoint = new L.marker(e.latlng).addTo(this.map);
      } else {
            userPoint.setLatLng(e.latlng);
      }
  }).on("locationerror", error => {
      if (userPoint) {
          map.removeLayer(userPoint);
          userPoint = undefined;
      }
  });


document.getElementsByClassName('geocoder-control-input leaflet-bar')[0].placeholder = "Leita af staðsetningu";

function CreateLine(){
    if(polyline) map.removeLayer(polyline)
    polyline = L.polyline([userPoint.getLatLng(), Destination.getLatLng()], {color: 'red'}).addTo(map);

    //hreyfir sjónina þína svo því getur séð báða punktana á kortinu
    map.fitBounds(L.latLngBounds([userPoint, Destination].map(marker => marker.getLatLng())))
    //RotateArrow();
    showdist = true;
    distanceBetween();
}

//Finnur lengdina á milli staðsetningana
function distanceBetween(){
    let usercoord = GetLatAndLng(userPoint);

    let destcoord = GetLatAndLng(Destination);

    let R = 6371e3; // metres
    let φ1 = usercoord[0] * Math.PI/180; // φ, λ in radians
    let φ2 = destcoord[0] * Math.PI/180;
    let Δφ = (destcoord[0]-usercoord[0]) * Math.PI/180;
    let Δλ = (destcoord[1]-usercoord[1]) * Math.PI/180;

    let a = Math.sin(Δφ/2) * Math.sin(Δφ/2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ/2) * Math.sin(Δλ/2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    let d = R * c; //Breytir í metra

    //Námundar í næsta INT og setur kommu ef það fer yfir 1000, síðan er þetta sent á HTML-ið
    distancetext.innerHTML = Math.round(d).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//
// !!! !!! !!!
//
// !!! !!! !!! 
//
// !!! !!! !!!
//
// !!! !!! !!!
// 
/*function updateUserPos(){
    var lat = (e.latlng.lat);
    var lng = (e.latlng.lng);
    var newLatLng = new L.LatLng(lat, lng);
    userPoint.setLatLng(newLatLng); 
    console.log("bruh")
    distancebetween();
}

setInterval(updateUserPos, 5000)*/



/*function RotateArrow(){
    //let rot = Math.atan2(Math.cos(lat1) * Math.sin(lat2)-Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2-lon1), Math.sin(lon2-lon1) * Math.cos(lat2))
    //var y = Math.sin(dLon) * Math.cos(lat2);
    //var x = Math.cos(lat1)*Math.sin(lat2) - Math.sin(lat1)*Math.cos(lat2)*Math.cos(dLon);
    //var brng = Math.atan2(y, x).toDeg();

    //var bearings = ["NE", "E", "SE", "S", "SW", "W", "NW", "N"];

    //var index = brng - 22.5;
    //if (index < 0)
    //    index += 360;
    //index = parseInt(index / 45);
    
    //return(bearings[index]);
    let usercoord = GetLatAndLng(userPoint);

    let destcoord = GetLatAndLng(Destination);


    //console.log(userx, usery, "---", destx, desty);

    console.log(usercoord, destcoord)
    
    var angleDeg = Math.atan2(destcoord[1] - usercoord[1], destcoord[0] - usercoord[0]) * 180 / Math.PI;
    console.log(angleDeg)
}*/


/*function getDistanceFromLatLonInKm() {

    let usercoord = GetLatAndLng(userPoint);

    let destcoord = GetLatAndLng(Destination);

    console.log(usercoord, destcoord)


    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(destcoord[0]-usercoord[0]);  // deg2rad below
    var dLon = deg2rad(destcoord[1]-usercoord[1]); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(usercoord[0])) * Math.cos(deg2rad(destcoord[0])) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    console.log(d)
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }*/







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

