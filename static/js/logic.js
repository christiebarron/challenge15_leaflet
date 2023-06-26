// A function to determine the marker size based on the population
function markerSize(population) {
  return Math.sqrt(population) * 50;
}

let eathquakeLink = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson" //4
let eathquakeLink2 = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson" //15
let earthquakeLink3 = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson" //636
let weekAll = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson" //1777
let dayAll = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson" //162



// Perform a GET request to the query URL/
d3.json(weekAll).then(function (data) {
    // Once we get a response, send the data.features object to the createFeatures function.
    
    //checking that the get request worked.
    // for (let i = 0; i < data["features"].length; i++) {
    //   console.log(data["features"][i]["properties"]["sig"])
    // }



  // Create a map object.
  let myMap = L.map("map", {
      center: [35, -82.30695],
      zoom: 5
    });


    
  // Add a tile layer.
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);


//map that plots all the earthquakes from your dataset based on their longitude and latitude.

  // Looping through the earthquake data, create one marker for each earthquake, bind a popup containing its info, and add it to the map.
  let coord = []
  let coord2 = []
  let coord3 = []
  let mag = []
  let depth = []
  let place = []
  let cdi = []
  let mmi = []
  let signif = []
  let time = []
  let alertQuake = []

  // Loop through the cities array, and create one marker for each city object
  for (let i = 0; i < data["features"].length; i++) {
    //extract just that earthquake's information
    let earthquake = data["features"][i];
    //check data is good
    //console.log(data) 

    //extract relevant data into a variety of arrays
    coord.push([earthquake["geometry"]["coordinates"][0], earthquake["geometry"]["coordinates"][1]]) //coordinates
    coord2.push(earthquake["geometry"]["coordinates"]) 
    coord3.push([earthquake["geometry"]["coordinates"][1], earthquake["geometry"]["coordinates"][0]]) 
    mag.push(earthquake["properties"]["mag"]) //magnitude
    depth.push(earthquake["geometry"]["coordinates"][2]) //depth (depth) 
    place.push(earthquake["properties"]["place"]) //place: string. 
    cdi.push(earthquake["properties"]["cdi"])// crowd-sourced intensity:  https://earthquake.usgs.gov/data/comcat/index.php#cdi 
    mmi.push(earthquake["properties"]["mmi"]) //professional intensity: https://erhepp.github.io/Earthquake-Intensity-Comparison-of-MMI-and-CDI/
    signif.push(earthquake["properties"]["sig"]) //significance. summary measure of intensity. range from 0 - 1000 https://earthquake.usgs.gov/data/comcat/index.php#sig
    time.push(earthquake["properties"]["time"])//time //https://earthquake.usgs.gov/data/comcat/index.php#time
    alertQuake.push(earthquake["properties"]["alert"])  //alert https://earthquake.usgs.gov/data/comcat/index.php#alert
    

    //add a marker at the extracted coordinates
    L.marker(coord3[i])
    //add a popup providing additional information
      .bindPopup(`<h1>${place[i]}</h1> <hr> <h3>Magnitude: ${mag[i]}. Alert: ${alertQuake[i]} Coord: ${coord3[i]}</h3>`)
      .addTo(myMap);

    //depth of the earthquake by color
    let color = "";
    if (depth[i] < 30) {
      color = "light green";
    }
    else if (depth[i] < 60) {
      color = "green";
    }
    else if (depth[i] < 90) {
      color = "yellow";
    }
    else {
      color = "red";
    }


    //magnitude of the earthquake by their size 
    L.circleMarker(coord3[i], {
      fillOpacity: 0.75,
      color: "black",
      fillColor: color,
      // Adjust the radius.
      radius: Math.sqrt(mag[i]) * 2.5
      
    }).bindPopup(
      //create popup
      `<h1>${place[i]}</h1> <hr> <h3>Magnitude: ${mag[i]}. Alert: ${alertQuake[i]}. Coord: ${coord3[i]}</h3>`
    ).addTo(myMap);

  }
  
  //console.log(coord)
  //console.log(depth)
});
//Create a legend that will provide context for your map data.

//