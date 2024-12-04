import { countryCoordinates } from "../constants/countryCoordinates.js";
import { world } from "./glob.js";
import { searchStore } from "../constants/searchStore.js";
import { depAndDesFlights } from "./depAndDesFlights.js";
import { populateFlightsList } from "./flightsResult.js";

export const handleDepAndDes = async () => {
  const dep = document.getElementById("dep-input").value.trim();
  const des = document.getElementById("des-input").value.trim();
  const listsOfFlights = document.getElementById("flights");
  const resetButton = document.getElementById("reset-button");
  const messageDiv = document.getElementById("message");

  // Validate that both dep and des are provided
  if ((!dep || !des)) {
    messageDiv.textContent = "Both departure and destination are required.";
    messageDiv.style.color = "red";
    world.arcsData([]);
    listsOfFlights.textContent=" ";
    return; // Exit if inputs are invalid
  }

  // Validate that both dep and des are valid countries
  const depCoordinates = countryCoordinates[dep];
  const desCoordinates = countryCoordinates[des];

  if (!depCoordinates || !desCoordinates) {
    messageDiv.textContent = "Invalid country entered. Please try again.";
    messageDiv.style.color = "red";
    world.arcsData([]);
    listsOfFlights.textContent=" "
    return; // Exit if coordinates are invalid
  }

  messageDiv.textContent = "";


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
      color: ["white", "green"],
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
    .arcStroke(1.2); 

  await world.pointOfView(
    { lat: desCoordinates.lat, lng: desCoordinates.lng, altitude: 2.5 },
    4000
  );
    // Add the arc to the globe
    world.arcsData(arcData)
        .arcStartLat((d) => d.startLat)
        .arcStartLng((d) => d.startLng)
        .arcEndLat((d) => d.endLat)
        .arcEndLng((d) => d.endLng)
        .arcColor((d) => d.color)
        .arcStroke(1.2); // Customize arc thickness
    // Zoom out to show the entire arc after a delay
    setTimeout(() => {
        world.pointOfView({ lat: desCoordinates.lat, lng: desCoordinates.lng, altitude: 2.5 }, 2000);
    }, 1000);
    // Add hover interaction
    let previousHoveredArc = null;
    world.onArcHover((arc) => {
        // Reset the previously hovered arc's color
        if (previousHoveredArc) {
            previousHoveredArc.color = ["white", "green"];
        }
        // Highlight the currently hovered arc
        if (arc) {
            arc.color = ["lightblue", "lightblue"];
            previousHoveredArc = arc;
        } else {
            previousHoveredArc = null;
        }
        // Reapply updated arcsData
        world.arcsData([...arcData]);
    });
    // Add click interaction to delete arcs
    world.onArcClick((arc) => {
        // Remove the clicked arc from arcData
        const index = arcData.findIndex(
            (a) =>
                a.startLat === arc.startLat &&
                a.startLng === arc.startLng &&
                a.endLat === arc.endLat &&
                a.endLng === arc.endLng
        );
        if (index !== -1) {
            arcData.splice(index, 1); // Remove arc from data
            world.arcsData([...arcData]); // Update globe
        }
    });
    
  const flightData = await depAndDesFlights();
    console.log("flightData", flightData);
    if (flightData && flightData.length > 0) {
      populateFlightsList(flightData);
    }
    resetButton.style.display = "inline-block";
};

// Reset functionality
export const resetToDefault = () => {
  const depInput = document.getElementById("dep-input");
  const desInput = document.getElementById("des-input");
  const messageDiv = document.getElementById("message");
  const resetButton = document.getElementById("reset-button");
  const flightsList = document.getElementById("flights");

  // Clear input fields
  depInput.value = '';
  desInput.value = '';

  // Clear the flights list
  flightsList.innerHTML = '';

  // Clear the message
  messageDiv.textContent = '';

  // Remove all arcs from the globe
  world.arcsData([]); // Reset the globe to default state

  // Hide the reset button
  resetButton.style.display = "none";

  // Optionally reset the globe's point of view
  world.pointOfView({ lat: 0, lng: 0, altitude: 2.5 }, 2000); // Default view
};

// Add event listener for reset button
document.getElementById("reset-button").addEventListener("click", resetToDefault);

