d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson").then(function(data){
    console.log(data);
    console.log(data.features[0].geometry.coordinates[0])
    
    var colorList = ["lightgreen","yellow","orange","red","darkred"]

    for (var i =0; i < data.features.length; i++){
        latitude = data.features[i].geometry.coordinates[0];
        longitude = data.features[i].geometry.coordinates[1];
        depth = data.features[i].geometry.coordinates[2];
        magnitude = data.features[i].properties.mag;
        place = data.features[i].properties.place

        let cNum = ""

        if (depth <= 10) {
          cNum = 0
        } else if (depth <= 50) {
          cNum = 1
        } else if (depth <= 100) {
          cNum = 2
        } else if (depth <= 250) {
          cNum = 3
        } else {
          cNum = 4
        }

        L.circleMarker([latitude,longitude], {
            color:"black",
            weight: .5,
            fillColor: colorList[cNum],
            fillOpacity: 1,
            radius: magnitude * 2
          }).addTo(myMap).bindPopup(
            `Location: ${place}<br />
             Magnitude: ${magnitude}<br />
             Depth: ${depth}`
          );
    }
});

var myMap = L.map("map", {
    center: [40.4168, -3.7038],
    zoom: 3
  });

var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
}).addTo(myMap);




