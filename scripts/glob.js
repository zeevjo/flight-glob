import { paths } from "../constants/paths.js";
import { globPov } from "../utils/globPov.js";

const countryCoordinates = {
  USA: { lat: 37.0902, lng: -95.7129 },
  India: { lat: 20.5937, lng: 78.9629 },
  China: { lat: 35.8617, lng: 104.1954 },
  Brazil: { lat: -14.235, lng: -51.9253 },
  Canada: { lat: 56.1304, lng: -106.3468 },
  Australia: { lat: -25.2744, lng: 133.7751 },
  France: { lat: 46.6034, lng: 1.8883 },
  Germany: { lat: 51.1657, lng: 10.4515 },
  israel: { lat: 31.77, lng: 35.23 },
};

const world = Globe()(document.getElementById("globe-container"))
  .globeImageUrl("//unpkg.com/three-globe/example/img/earth-blue-marble.jpg")
  .showAtmosphere(true)
  .atmosphereAltitude(0.2);

const resizeGlobe = () => {
  const container = document.getElementById("globe-container");
  const width = container.offsetWidth;
  const height = container.offsetHeight;

  world.width(width).height(height);

  const screenWidth = window.innerWidth;
  let altitude;

  if (screenWidth <= 310) {
    altitude = 10;
  } else if (screenWidth <= 400) {
    altitude = 9;
  } else if (screenWidth <= 600) {
    altitude = 9;
  } else if (screenWidth <= 768) {
    altitude = 4;
  } else if (screenWidth <= 2570) {
    altitude = 3;
  }

  world.pointOfView({ lat: 0, lng: 0, altitude }, 0);
};

globPov(world);
window.addEventListener("resize", resizeGlobe);

resizeGlobe();

const clickedLocations = [];
const routes = [];

// Add search functionality
document.getElementById("search-button").addEventListener("click", () => {
  const countryName = document.getElementById("search-input").value.trim();
  const coordinates = countryCoordinates[countryName];
  if (coordinates) {
    world.pointOfView(
      { lat: coordinates.lat, lng: coordinates.lng, altitude: 0.7 },
      2000 // Animation duration in ms
    );
  } else {
    alert("Country not found. Please enter a valid country name.");
  }
});

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

  // Find the index of the clicked arc in the routes array
  const arcIndex = routes.findIndex(
    (r) =>
      r.startLat === arc.startLat &&
      r.startLng === arc.startLng &&
      r.endLat === arc.endLat &&
      r.endLng === arc.endLng
  );

  if (arcIndex !== -1) {
    // Remove the arc from the routes array
    routes.splice(arcIndex, 1);

    // Update the globe with the modified routes array
    world.arcsData([...routes]);
  }
});

// Keep track of the previously hovered arc
let previousHoveredArc = null;

// Add hover listener to change arc color
world.onArcHover((arc) => {
  // Reset the color of the previously hovered arc
  if (previousHoveredArc) {
    previousHoveredArc.color = ["white", "white"];
  }

  // Highlight the currently hovered arc
  if (arc) {
    arc.color = ["lightgreen", "lightgreen"];
    previousHoveredArc = arc;
  } else {
    previousHoveredArc = null;
  }

  // Reapply the updated routes array
  world.arcsData([...routes]);
});
