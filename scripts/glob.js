import { paths } from "../constants/paths.js";
import { globPov } from "../utils/globPov.js";
import {handleDepAndDes} from "/scripts/handleDepAndDes.js"
import {setDefaultDeparture} from "/scripts/setDefaultDeparture.js"

export const world = Globe()(document.getElementById("globe-container"))
.globeImageUrl(
  paths.globUrl
)
.showAtmosphere(true)
.atmosphereAltitude(0.2);

const resizeGlobe = () => {
const container = document.getElementById("globe-container");
const width = container.offsetWidth;
const height = container.offsetHeight;

world.width(width).height(height);

const screenWidth = window.innerWidth;
let altitude;

if (screenWidth <= 320) {
  altitude = 15;
} else if (screenWidth <= 600) {
  altitude = 9;
} else if (screenWidth <= 768) {
  altitude = 4;
} else if (screenWidth <= 2570) {
  altitude = 3;
}

world.pointOfView({ lat: 0, lng: 0, altitude }, 0);
};



window.addEventListener("resize", resizeGlobe);

resizeGlobe();
globPov(world);

const clickedLocations = [];
const routes = [];

// Add click listener to globe for arcs
world.onGlobeClick(({ lat, lng }) => {
  console.log(`Longitude: ${lng}, Latitude: ${lat}`);
  clickedLocations.push({ lat, lng });

  world
    .pointsData(clickedLocations)
    .pointLat((d) => d.lat)
    .pointLng((d) => d.lng)
    .pointColor(() => "red")
    .pointRadius(() => 0.2);

  if (clickedLocations.length === 2) {
    const [start, end] = clickedLocations;
    routes.push({
      startLat: start.lat,
      startLng: start.lng,
      endLat: end.lat,
      endLng: end.lng,
      color: ["white", "white"],
    });

    world
      .arcsData(routes)
      .arcStartLat((d) => d.startLat)
      .arcStartLng((d) => d.startLng)
      .arcEndLat((d) => d.endLat)
      .arcEndLng((d) => d.endLng)
      .arcColor((d) => d.color)
      .arcStroke(0.6);

    clickedLocations.length = 0; // Reset clicked locations
  }
});

// Add arc click listener
world.onArcClick((arc) => {
  console.log("Arc clicked:", arc);


  const arcIndex = routes.findIndex(
    (r) =>
      r.startLat === arc.startLat &&
      r.startLng === arc.startLng &&
      r.endLat === arc.endLat &&
      r.endLng === arc.endLng
  );

  if (arcIndex !== -1) {

    routes.splice(arcIndex, 1);


    world.arcsData([...routes]);
  }
});


let previousHoveredArc = null;


world.onArcHover((arc) => {
  if (previousHoveredArc) {
    previousHoveredArc.color = ["white", "white"];
  }

  if (arc) {
    arc.color = ["lightgreen", "lightgreen"];
    previousHoveredArc = arc;
  } else {
    previousHoveredArc = null;
  }


  world.arcsData([...routes]);
});

setDefaultDeparture();


document.getElementById("search-button").addEventListener("click", handleDepAndDes);

