function createMap(Earthquakes) {

    // Create the tile layer that will be the background of our map
    var emap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
      maxZoom: 18,
      id: "earth.map",
    });
  
    // Create a baseMaps object to hold the emap layer
    var baseMaps = {
      "Map": emap
    };
  
    // Create an overlayMaps object to hold the Earthquakes layer
    var overlayMaps = {
      "Earthquakes": Earthquakes
    };
  
    // Create the map object with options
    var map = L.map("map-id", {
      center: [40.73, -74.0059],
      zoom: 12,
      layers: [map, Earthquakes]
    });
  
    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(map);
  }
  
  function createMarkers(response) {
  
    // Pull the "stations" property off of response.data
    var features = response.data.features;
  
    // Initialize an array to hold bike markers
    var EQMarkers = [];
  
    // Loop through the stations array
    for (var index = 0; index < features.geometry.length; index++) {
      var feature = features[index];
  
      // For each station, create a marker and bind a popup with the station's name
      var EQMarker = L.marker([feature.geometry.coordinates])
        .bindPopup("<h3>" + feature.id + "<h3><h3>Magnitude: " + feature.properties.mag + "</h3>");
  
      // Add the marker to the bikeMarkers array
      EQMarkers.push(EQMarker);
    }
  
    // Create a layer group made from the bike markers array, pass it into the createMap function
    createMap(L.layerGroup(EQMarkers));
  }
  
  
  // Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", createMarkers);
  