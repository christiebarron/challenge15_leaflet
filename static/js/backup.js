

  // Create a map object.
  let myMap = L.map("map", {
    //center: [37.09, -95.71],
    zoom: 5
  });
  
// Add a tile layer.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

//map that plots all the earthquakes from your dataset based on their longitude and latitude.

// Looping through the earthquake data, create one marker for each earthquake, bind a popup containing its info, and add it to the map.
let coord = []
let mag = []
let depth = []
let place = []
let cdi = []
let mmi = []
let sig = []
let time = []
let alertQuake = []

// Loop through the cities array, and create one marker for each city object
for (let i = 0; i < earthquakesData["features"].length; i++) {
  //extract just that earthquake's information
  let earthquake = earthquakesData["features"][i];
  //check data is good
  console.log(earthquake) 

  //extract relevant data into a variety of arrays
  coord.push([earthquake["geometry"]["coordinates"][0], earthquake["geometry"]["coordinates"][1]]) //coordinates
  mag.push(earthquake["properties"]["mag"]) //magnitude
  depth.push(earthquake["geometry"]["coordinates"][2]) //depth (depth) 
  place.push(earthquake["properties"]["place"]) //place: string. 
  cdi.push(earthquake["properties"]["cdi"])// crowd-sourced intensity:  https://earthquake.usgs.gov/data/comcat/index.php#cdi 
  mmi.push(earthquake["properties"]["mmi"]) //professional intensity: https://erhepp.github.io/Earthquake-Intensity-Comparison-of-MMI-and-CDI/
  sig.push(earthquake["protperies"]["sig"]) //significance. summary measure of intensity. range from 0 - 1000 https://earthquake.usgs.gov/data/comcat/index.php#sig
  time.push(earthquake["protperies"]["time"])//time //https://earthquake.usgs.gov/data/comcat/index.php#time
  alertQuake.push(earthquake["properties"]["alert"])  //alert https://earthquake.usgs.gov/data/comcat/index.php#alert

  //add a marker at the extracted coordinates
  L.marker(coord[i])
  //add a popup providing additional information
    .bindPopup(`<h1>${place[i]}</h1> <hr> <h3>Magnitude: ${mag[i]}. Alert: ${alertQuake[i]}</h3>`)
    .addTo(myMap);

  //depth of the earthquake by color
  let color = "";
  if (depth[i] < .03) {
    color = "light green";
  }
  else if (depth[i] < .04) {
    color = "green";
  }
  else if (depth[i] < .06) {
    color = "yellow";
  }
  else {
    color = "red";
  }

  //magnitude of the earthquake by their size 
  L.circle(coord[i], {
    fillOpacity: 0.75,
    color: "white",
    fillColor: color,
    // Adjust the radius.
    radius: Math.sqrt(mag[i]) * 500
  })


}

});
//Create a legend that will provide context for your map data.

//