// add console.log to check to see if our code is working
console.log("Working");

// Create the map object with a center and zoom level.
let map = L.map("mapid").setView([29.7604, -95.3698], 5);

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

// Add a marker to the map of Los Angeles, California
// var marker = L.marker([34.0522, -118.2437]).addTo(map);

// Add a circle marker to the map of Newark, New Jersey
L.circle([40.7357, -74.1724],{
    radius: 100
}).addTo(map);


// SkillDrill 13.4.1

// Creates Dark Tile Layer to the map
let darkmap = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});

// Then we add our 'darkmap' tile layer to the map.
darkmap.addTo(map);

// // Add light-yellow circle marker to map with black line
L.circle([34.0522, -118.2437], {
    radius: 300, //This radius is in meter because it is a L.circle
    fillColor: "#FFFFBF",
    fillOpacity: 0.2,
    color: "black"
}).addTo(map);

// Add light-yellow circle marker to map with black line
// L.circleMarker([34.0522, -118.2437], {
//     radius: 300, //This radius is in pixels because it is a L.circleMarker
//     fillColor: "#FFFFBF",
//     fillOpacity: 0.2,
//     color: "black"
// }).addTo(map);

// Get data from cities.js
let cityData = cities;

// Loop through the cities array and create one marker for each city.
cityData.forEach(function(city) {
    console.log(city)
    // Below is how to add a marker for each city with a popup message
    // L.marker(city.location).bindPopup("<h2><center>" + city.city + "," + city.state + "</center></h2><hr><h3>Population: " + city.population.toLocaleString() + "</h3>").addTo(map);
    // Below is how to add a circleMarker for each city with a popup message and radius w/ population size
    L.circleMarker(city.location,{
        // skillDrill 13.4.2 - change radius to divide it by 200,000, add color orange and lineweight
        radius: (city.population - 200000) / 100000,
        color: "orange",
        lineWeight: 4
    }).bindPopup("<h2><center>" + city.city + "," + city.state + "</center></h2><hr><h3>Population: " + city.population.toLocaleString() + "</h3>").addTo(map);
});