// add console.log to check to see if our code is working
console.log("Working");

// Create the map object with a center and zoom level.
let map = L.map('mapid').setView([37.5, -122.5], 10);

// Add GeoJSON data.
let sanFranAirport =
{"type":"FeatureCollection","features":[{
    "type":"Feature",
    "properties":{
        "id":"3469",
        "name":"San Francisco International Airport",
        "city":"San Francisco",
        "state": "CA",
        "country":"United States",
        "faa":"SFO",
        "icao":"KSFO",
        "alt":"13",
        "tz-offset":"-8",
        "dst":"A",
        "tz":"America/Los_Angeles"},
        "geometry":{
            "type":"Point",
            "coordinates":[-122.375,37.61899948120117]}}
]};

//// pointToLayer function below

//// Grabbing our GeoJSON Data
// L.geoJSON(sanFranAirport,{
//     // we turn each featurei nto a marker on the map
//     pointToLayer: function(feature, latlng){
//         console.log(feature);
//         //// create just a regular marker below
//         return. L.marker(latlng).addTo(map);
//         //// create a circleMarker below -> (feature calls the data then depends if we want circle to have a radius with some of the data parameters as seen below) -> check data above for questions -> sanFranAirport
//         return L.circleMarker(latlng,{
//             radius: feature.properties.id / 100
//         }).bindPopup("<h2>" + feature.properties.city + "</h2>");
//     }
// }).addTo(map);

//// SkillDRill 13.5.2 - adds bindPopup to show Airport Name, city, state, country w/ a navigation preview night layer
// L.geoJSON(sanFranAirport,{
//     pointToLayer: function(feature, latlng){
//         console.log(feature);
//         return L.marker(latlng).bindPopup("<h3>" + feature.properties.name + "</h3><hr><h4>" + feature.properties.city + ", " + feature.properties.state + ", " + feature.properties.country + "</h4>");
//     }
// }).addTo(map);

//// adds night navigation preview layer to map
// let nightPrev = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-preview-night-v4/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     tileSize: 512,
//     zoomOffset: -1,
//     accessToken: API_KEY
// });
// nightPrev.addTo(map);

//// onEachFeature function below
//// SkillDrill 13.5.2 part 2 - add outdoor tile layer w/ popup that displays Airport Code + airport name
L.geoJSON(sanFranAirport, {
    onEachFeature: function(feature, layer){
        console.log(layer);
        layer.bindPopup("<h3>Airport Code: " + feature.properties.faa + "</h3><hr><h4>Airport Name: " + feature.properties.name + "</h4>");
    }
}).addTo(map);

//// adds  outdoor layer to map (part of the skilldrill 13.5.2 part 2)
let outdoors = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});
outdoors.addTo(map);


////////// CODE BELOW FOR LINES AND DASHED LINES  //////////

//// Coordinates for each point to be used in the line
// let line = [
//     [33.9416, -118.4085],
//     [37.6213, -122.3790],
//     [40.7899, -111.9791],
//     [47.4502, -122.3088]
// ];

//// Create a polyline using the line coordinates and make the line red.
// L.polyline(line, {
//     color: "yellow"
// }).addTo(map);

// let satStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     tileSize: 512,
//     zoomOffset: -1,
//     accessToken: API_KEY
// });

// // satStreets.addTo(map);

//// SkilLDrill 13.4.3 - Create a dashed line from SFO to AUS to YYZ to Kearny 
// let dashLine = [
//     [37.6213, -122.3790],
//     [30.1975, -97.6664],
//     [43.6777, -79.6248],
//     [40.7684, -74.1454]
// ]

// let lightMap = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     tileSize: 512,
//     zoomOffset: -1,
//     accessToken: API_KEY
// });
// lightMap.addTo(map);

// L.polyline(dashLine, {
//     color: "blue",
//     weight: 4,
//     opacity: 0.5,
//     dashArray: "10, 10"
// }).addTo(map);



////////// CODE BELOW FOR MULTIPLE AND SINGLE MARKERS AND CIRCLE MARKERS //////////

//// Another method for the above
// let map2 = L.map("mapid", {
//     center: [40.7, -94.5],
//     zoom: 4
// });

//// We create the tile layer that will be the background of our map.
// let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     tileSize: 512,
//     zoomOffset: -1,
//     accessToken: API_KEY
// });
// Then we add our 'graymap' tile layer to the map.
// streets.addTo(map);

//// Add a marker to the map of Los Angeles, California
// var marker = L.marker([34.0522, -118.2437]).addTo(map);

//// Add a circle marker to the map of Newark, New Jersey
// L.circle([40.7357, -74.1724],{
//     radius: 100
// }).addTo(map);


//// SkillDrill 13.4.1

//// Creates Dark Tile Layer to the map
// let darkmap = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     tileSize: 512,
//     zoomOffset: -1,
//     accessToken: API_KEY
// });

//// Then we add our 'darkmap' tile layer to the map.
// darkmap.addTo(map);

//// Add light-yellow circle marker to map with black line
// L.circle([34.0522, -118.2437], {
//     radius: 300, //// This radius is in meter because it is a L.circle
//     fillColor: "#FFFFBF",
//     fillOpacity: 0.2,
//     color: "black"
// }).addTo(map);

//// Add light-yellow circle marker to map with black line
// L.circleMarker([34.0522, -118.2437], {
//     radius: 300, //// This radius is in pixels because it is a L.circleMarker
//     fillColor: "#FFFFBF",
//     fillOpacity: 0.2,
//     color: "black"
// }).addTo(map);

//// Get data from cities.js
// let cityData = cities;

//// Loop through the cities array and create one marker for each city.
// cityData.forEach(function(city) {
//     console.log(city)
//     //// Below is how to add a marker for each city with a popup message
//      L.marker(city.location).bindPopup("<h2><center>" + city.city + "," + city.state + "</center></h2><hr><h3>Population: " + city.population.toLocaleString() + "</h3>").addTo(map);
//     //// Below is how to add a circleMarker for each city with a popup message and radius w/ population size
//     L.circleMarker(city.location,{
//         //// skillDrill 13.4.2 - change radius to divide it by 200,000, add color orange and lineweight
//         radius: (city.population - 200000) / 100000,
//         color: "orange",
//         lineWeight: 4
//     }).bindPopup("<h2><center>" + city.city + "," + city.state + "</center></h2><hr><h3>Population: " + city.population.toLocaleString() + "</h3>").addTo(map);
// });