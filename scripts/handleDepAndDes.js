import { countryCoordinates } from "../constants/countryCoordinates.js";
import { world } from "./glob.js";
import { searchStore } from "../constants/searchStore.js";
import { depAndDesFlights } from "./depAndDesFlights.js";
import { populateFlightsList } from "./flightsResult.js";

export const handleDepAndDes = async () => {
  const dep = document.getElementById("dep-input").value.trim();
  const des = document.getElementById("des-input").value.trim();
  const messageDiv = document.getElementById("message");

  // Validate that both dep and des are provided
  if (!dep || !des) {
    messageDiv.textContent = "Both departure and destination are required.";
    messageDiv.style.color = "red";
    return; // Exit if inputs are invalid
  }

  // Validate that both dep and des are valid countries
  const depCoordinates = countryCoordinates[dep];
  const desCoordinates = countryCoordinates[des];

  if (!depCoordinates || !desCoordinates) {
    messageDiv.textContent = "Invalid country entered. Please try again.";
    messageDiv.style.color = "red";
    return; // Exit if coordinates are invalid
  }

  // Set success message
  messageDiv.textContent = `Flight path set from ${dep} to ${des}.`;
  messageDiv.style.color = "green";

  // Store departure and destination
  searchStore.setDep(dep);
  searchStore.setDes(des);

  // Move globe to departure country
  await world.pointOfView(
    { lat: depCoordinates.lat, lng: depCoordinates.lng, altitude: 0.7 },
    2000
  );

  // Initialize arcData
  const arcData = [
    {
      startLat: depCoordinates.lat,
      startLng: depCoordinates.lng,
      endLat: desCoordinates.lat,
      endLng: desCoordinates.lng,
      color: ["white", "green"], // Arc starts white and ends green
    },
  ];

  // Add the arc to the globe
  world
    .arcsData(arcData)
    .arcStartLat((d) => d.startLat)
    .arcStartLng((d) => d.startLng)
    .arcEndLat((d) => d.endLat)
    .arcEndLng((d) => d.endLng)
    .arcColor((d) => d.color)
    .arcStroke(1.2); // Customize arc thickness

  // Perform the zoom-out animation
  await world.pointOfView(
    { lat: desCoordinates.lat, lng: desCoordinates.lng, altitude: 2.5 },
    4000
  );

  // Use setTimeout to delay the rendering of the flight results
  setTimeout(async () => {
    // Fetch flight data and display results
    const flightData = await depAndDesFlights();
    if (flightData && flightData.length > 0) {
      populateFlightsList(flightData);
    }
  }, 500); // Adjust the delay (500ms) if necessary
};
