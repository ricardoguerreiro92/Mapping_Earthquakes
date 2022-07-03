// add console.log to check to see if our code is working
console.log("Working");

//////////////////////// NOTE TO SELF - DO TILE LAYERS FIRST THEN CALL MAP THEN DO MARKERS ETC ////////////////////////


//// Adds street layer
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});

let satStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});

// Create the map object with a center and zoom level - can only use layers: [layer variable name here] after base layer as been set as show above 
let map = L.map('mapid',{
    center: [39.5, -98.5],
    zoom:3,
    layers: [streets]
});

// Creates baseMaps for different layers to be controlled by control function
let baseMaps = {
    // Light: light,
    // Dark: darkMap
    Streets: streets,
    "Satellite Streets": satStreets
};

// Create the earthquake layer for our map
let earthquakes = new L.layerGroup();

// We define an object that contains the overlays (just like baseMaps that contain the tile layers).
// This overlay will be visible at all time. (differs from baseMaps when only 1 can be viewed at a time).
let overlays = {
    Earthquakes: earthquakes
};

// Then we add a control to the map that will allow the user to change which layers are visible
L.control.layers(baseMaps, overlays).addTo(map);

////////////////////////////////////////////////////////////    NOTE TO SELF - CREATE STYLING FUNCTIONS OUT OF THE d3.json() FUNCTION AND CALL THEM IN THERE AFTER ////////////////////////////////////////////////////////////
// This function returns the style data for each of the earthquakes we plot on the map.
// We pass on the magnitude of the earthquake into two separate functions to calculate the color and radius.
function styleInfo(feature){
    return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: getColor(feature.properties.mag),
        color: "#000000",
        radius: getRadius(feature.properties.mag),
        stroke: true,
        weight:0.5
    };
};

function getRadius(magnitude){
    if (magnitude === 0) {
        return 1;
    }
    return magnitude * 4;
};

function getColor(magnitude){
    if (magnitude > 5) {
        return "#ea2c2c";
    }
    if (magnitude > 4) {
        return "#ea822c";
    }
    if (magnitude > 3) {
        return "#ee9c00";
    }
    if (magnitude > 2) {
        return "#eecc00";
    }
    if (magnitude > 1) {
        return "#d4ee00";
    }
    return "#98ee00";
}


// To have the Earthquakes overlay button "on," we need to:
// 1. Replace the map variable in the addTo(map) function with earthquakes.
// 2. Before the closing bracket and parenthesis of the d3.json()method we add the earthquake layer to the map, with earthquakes.addTo(map);.

// Retrieve the earthquake GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data,{
    // We turn each feature into a circleMarker on the map
    pointToLayer: function(feature, latlng){
        console.log(data);
        return L.circleMarker(latlng);
    },
    // We set the style for each circleMarker using our styleInfo function
    style: styleInfo,
    // We create a popup for each circleMarker to display the magnitude and location of the earthquake after the marker has been created and styled.
    onEachFeature: function(feature, layer){
        layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    }
  }).addTo(earthquakes);
// Then we add the earthquake layer to our map
earthquakes.addTo(map);
});
////////////////////////////////////////////////////////////    NOTE TO SELF - CREATE STYLING FUNCTIONS OUT OF THE d3.json() FUNCTION AND CALL THEM IN THERE AFTER ////////////////////////////////////////////////////////////


/////////////////////////////////// NOTE TO SELF - No need to create variables to call in baseMaps -> we can do key(in this case streets): L.tilelayer() function then on layers: [] we can call dictionary.key -> example here would be baseMaps.Street
                                                                                                                                                                                                            ///////////// if variable hasnt been created
/////////////////////////////////////////////////////////////////////////////////////////////////////////// EXAMPLE OF PREVIOUS NOTE TO SELF ///////////////////////////////////////////////////////////////////////////////////////////////////////////
//  let baseMaps = {                                                                                                                                                                                                                                  //
//     Street: L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {                                                                                                                      //
//         attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',    //
//         maxZoom: 18,                                                                                                                                                                                                                               //
//         tileSize: 512,                                                                                                                                                                                                                             //
//         zoomOffset: -1,                                                                                                                                                                                                                            //
//         accessToken: API_KEY                                                                                                                                                                                                                       //
//     }),                                                                                                                                                                                                                                            //
//     Dark: L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {                                                                                                                           //
//         attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',    //
//         maxZoom: 18,                                                                                                                                                                                                                               //
//         tileSize: 512,                                                                                                                                                                                                                             //
//         zoomOffset: -1,                                                                                                                                                                                                                            //
//         accessToken: API_KEY                                                                                                                                                                                                                       //
//     })                                                                                                                                                                                                                                             //
// };                                                                                                                                                                                                                                                 //
//                                                                                                                                                                                                                                                    //
// let map = L.map('mapid', {                                                                                                                                                                                                                         //
//     center: [40.7, -94.5],                                                                                                                                                                                                                         //
//     zoom:4,                                                                                                                                                                                                                                        //
//     layers: [baseMaps.Street]                                                                                                                                                                                                                      //
// });                                                                                                                                                                                                                                                //
/////////////////////////////////////////////////////////////////////////////////////////////////////////// EXAMPLE OF PREVIOUS NOTE TO SELF ///////////////////////////////////////////////////////////////////////////////////////////////////////////

//// Add GeoJSON data.
// let sanFranAirport =
// {"type":"FeatureCollection","features":[{
//     "type":"Feature",
//     "properties":{
//         "id":"3469",
//         "name":"San Francisco International Airport",
//         "city":"San Francisco",
//         "state": "CA",
//         "country":"United States",
//         "faa":"SFO",
//         "icao":"KSFO",
//         "alt":"13",
//         "tz-offset":"-8",
//         "dst":"A",
//         "tz":"America/Los_Angeles"},
//         "geometry":{
//             "type":"Point",
//             "coordinates":[-122.375,37.61899948120117]}}
// ]};

//// adds  outdoor layer to map - Having the tileLayer() method before accessing large datasets ensures that the map gets loaded before the data is added to it.
// let outdoors = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     tileSize: 512,
//     zoomOffset: -1,
//     accessToken: API_KEY
// });
// outdoors.addTo(map);

//// Add GeoJSON data w/ external link
// let torontoData = "https://raw.githubusercontent.com/ricardoguerreiro92/Mapping_Earthquakes/main/torontoRoutes.json";

// let airportData = "https://raw.githubusercontent.com/ricardoguerreiro92/Mapping_Earthquakes/Mapping_GeoJSON_Points/Mapping_GeoJSON_Points/static/js/majorAirports.json";

// let torontoHoods = "https://raw.githubusercontent.com/ricardoguerreiro92/Mapping_Earthquakes/main/torontoNeighborhoods.json";

// // Next, we'll add the d3.json() method, which returns a promise with the then() method and the anonymous function().
// d3.json(airportData).then(function(data){
//     console.log(data);
//     // creating a GeoJSON layer with the retrieved data
//     L.geoJSON(data).addTo(map);
// });


//// SkillDrill 13.5.5 - add a line for each destination with light yellow color
// d3.json(torontoData).then(function(data){
//     console.log(data);
//     // Create GeoJSON layer with the retreived data from torontoData
//     L.geoJSON(data, {
//         onEachFeature: function(feature, latlng){
//             L.polyline(latlng.bindPopup("<h3>Airline Code: " + feature.properties.airline + "</h3><hr><h4>Destination Code: " + feature.properties.dst + "</h4>"));
//         },
//         style: function(){
//             return { color: "#ffffe0", weight: 2}
//         }
//     }).addTo(map);
// });

////skilldrill 13.5.3 - add binPopup to json data
// d3.json(airportData).then(function(data){
//     console.log(data);
//     // Create GeoJSON layer with the retrieved data from airportData and add bindPopup for each marker
//     L.geoJSON(data, {
//         onEachFeature: function(feature, layer){
//             layer.bindPopup("<h3>Airport Code: " + feature.properties.faa + "</h3><hr><h4>Airport Name: " + feature.properties.name + "</h4>").addTo(map);
//         }
//     });
// });

//// creating Polygons from torontoHoods - SkillDrill 13.5.6 - add bindPopup for each neighborhood, changes fillColor to yellow
// d3.json(torontoHoods).then(function(data){
//     console.log(data);
//     // Create GeoJSON layer with the retrieved data from torontoHoods, adds bindPopup for each polygon and changes color to yellow
//     L.geoJSON(data, {
//         onEachFeature: function(feature, layer){
//             layer.bindPopup("<h3>Neighborhood: " + feature.properties.AREA_NAME + "</h3>")
//         },
//         style: function(){
//             return { color: "blue", fillColor: "yellow",  weight: 1}
//         }
//     }).addTo(map);
// });

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

//// onEachFeature function below
//// SkillDrill 13.5.2 part 2 - add outdoor tile layer w/ popup that displays Airport Code + airport name
// L.geoJSON(sanFranAirport, {
//     onEachFeature: function(feature, layer){
//         console.log(layer);
//         layer.bindPopup("<h3>Airport Code: " + feature.properties.faa + "</h3><hr><h4>Airport Name: " + feature.properties.name + "</h4>");
//     }
// }).addTo(map);


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

//// Add a marker to the map of Los Angeles, California
// var marker = L.marker([34.0522, -118.2437]).addTo(map);

//// Add a circle marker to the map of Newark, New Jersey
// L.circle([40.7357, -74.1724],{
//     radius: 100
// }).addTo(map);


//// SkillDrill 13.4.1


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