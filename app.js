//Punktanir
var userPoint;
var Destination;

//Lína á milli punktana
var polyline;

//Textinn á HTML sem sýnir lengdina
var distancetext = document.getElementById("distext");


//-----------------------------------------


//Default punktur er blár svo ég bý til grænan til að sýna hvar lokapunkturinn er
var greenIcon = new L.Icon({iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png', shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]});

//Stillir kortið fyrir mobile
var map = L.map('mapid', { zoomControl: false, attributionControl: false }).fitWorld();

//Nær í og býr til kort
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' + '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' + 'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',    
    id: 'mapbox/streets-v11',
    maxZoom: 18,
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);

//Bætir við search bar svo notandinn getur sláð inn staðsetningu
var searchControl = new L.esri.Controls.Geosearch().addTo(map);
var results = new L.LayerGroup().addTo(map);

//Setur punkt fyrir lokapunktinn og býr til línu á milli
searchControl.on('results', function(data){
    //Hreinsar gamla lokapunkta
    results.clearLayers();

    for (var i = data.results.length - 1; i >= 0; i--) {
        //Setur inn grænan endapunkt
        Destination = L.marker(data.results[i].latlng, {icon: greenIcon});
        results.addLayer(Destination);

        //Býr til línu á milli
        CreateLine();
    }
});

//Ef notandinn finnst þá er settur blár punktur
function UserLocation(e) {
    var radius = e.accuracy;

    //Býr til marker þar sem notandinn er staðsettur
    userPoint = L.marker(e.latlng).addTo(map);
    L.circle(e.latlng, radius -15).addTo(map);

    distanceBetween();
}

//Nær í lat og lng (staðsetningu) af marker og skilar því sem array
function GetLatAndLng(position){
    let latAndLng = position.getLatLng().toString().match(/[^(]+(?=\))/g) + "";
    latAndLng = latAndLng.split(',').map(x=>+x);

    return latAndLng;
}

//Error ef notandinn finnst ekki
function UserNotFound(e) { alert(e.message); }

//Þegar kortið kveikist þá leitar það af notandanum
//map.on('locationfound', UserLocation);
//map.on('locationerror', UserNotFound);

//Finnur notandan og uppfærir staðsetningu hans
map.locate({
    setView: true,
    watch: true,
    enableHighAccuracy: true,
    maxZoom: 1200
    //Ef notandinn finnst
    }).on("locationfound", e => {
        if (!userPoint) {
            userPoint = new L.marker(e.latlng).addTo(this.map);
        } else {
            userPoint.setLatLng(e.latlng);
            distanceBetween();
            //if(!Destination)
                //distanceBetween();
        }
    }).on("locationerror", error => {
        if (userPoint) {
            map.removeLayer(userPoint);
            userPoint = undefined;
        }
});


document.getElementsByClassName('geocoder-control-input leaflet-bar')[0].placeholder = "Leita af staðsetningu";


//Býr til línu á milli notandans og lokapunkts
function CreateLine(){
    //Ef það er lína þá er hún eydd annars er bætt við
    if(polyline) map.removeLayer(polyline)
    polyline = L.polyline([userPoint.getLatLng(), Destination.getLatLng()], {color: 'red'}).addTo(map);

    //hreyfir sjónina þína svo því getur séð báða punktana á kortinu
    map.fitBounds(L.latLngBounds([userPoint, Destination].map(marker => marker.getLatLng())))

    //Reiknar lengdina á milli punktana
    distanceBetween();
}

//Finnur lengdina á milli staðsetningana (þessi formúla fannst á netinu, hún er ekki 100% nákvæm)
function distanceBetween(){
    //Nær í staðsetningar notandans og endapunkts
    let usercoord = GetLatAndLng(userPoint);
    let destcoord = GetLatAndLng(Destination);

    let R = 6371e3; //Metrar
    let φ1 = usercoord[0] * Math.PI/180;
    let φ2 = destcoord[0] * Math.PI/180;
    let Δφ = (destcoord[0]-usercoord[0]) * Math.PI/180;
    let Δλ = (destcoord[1]-usercoord[1]) * Math.PI/180;

    let a = Math.sin(Δφ/2) * Math.sin(Δφ/2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ/2) * Math.sin(Δλ/2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    let d = R * c; //Breytir í metra

    //Námundar í næsta INT og setur kommu ef það fer yfir 1000, síðan er þetta sent á HTML-ið
    distancetext.innerHTML = Math.round(d).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


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

