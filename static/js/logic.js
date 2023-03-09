d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson").then(function(data){
    console.log(data);
    console.log(data.features[0].geometry.coordinates[0])
    var quakeMarkers = [];

    for (var i =0; i < data.features.length; i++){
        latitude = data.features[i].geometry.coordinates[0];
        longitude = data.features[i].geometry.coordinates[1];
        depth = data.features[i].geometry.coordinates[2];
        magnitude = data.features[i].properties.mag;
        place = data.features[i].properties.place

        L.circle([latitude,longitude], {
            color: "red",
            fillColor: "red",
            fillOpacity: .5 + depth/1200,
            radius: magnitude * 25000
          }).addTo(myMap).bindPopup(
            `Location: ${place}<br />
             Magnitude: ${magnitude}<br />
             Depth: ${depth}`
          );
    }
});

var myMap = L.map("map", {
    center: [40.4168, -3.7038],
    zoom: 2
  });

var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
}).addTo(myMap);



