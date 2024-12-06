import { countryCoordinates } from "../constants/countryCoordinates.js";
import { world } from "./glob.js";
import { searchStore } from "../constants/searchStore.js";
import { depAndDesFlights } from "./depAndDesFlights.js";
import { populateFlightsList } from "./flightsResult.js";
import { setDefaultDeparture } from "./setDefaultDeparture.js";
import { globPov } from "../utils/globPov.js";
import { callGPT } from "./gpt.js";
import { buildAiTravelAgent } from "../utils/buildAiTravelAgent.js";

export const handleDepAndDes = async () => {
  const depElement = document.getElementById("dep-input");
  const desElement = document.getElementById("des-input");
  const listsOfFlights = document.getElementById("flights");
  const resetButton = document.getElementById("reset-button");
  const messageDiv = document.getElementById("message");
  const flightsList = document.getElementById("flights");

  let dep = depElement.value
    .trim()
    .toLowerCase()
    .replace(/^./, (char) => char.toUpperCase());
  let des = desElement.value
    .trim()
    .toLowerCase()
    .replace(/^./, (char) => char.toUpperCase());

  if (searchStore.getDep() === dep && searchStore.getDes() === des) {
    console.log("don't search twice");
    return;
  }

  depElement.value = dep;
  desElement.value = des;

  if (dep === "United states") {
    dep = "USA";
  }

  if (des === "United states") {
    des = "USA";
  }

  if (!dep || !des) {
    messageDiv.textContent = "Both departure and destination are required.";
    messageDiv.style.color = "red";
    messageDiv.style.display = "block";
    world.arcsData([]);
    listsOfFlights.textContent = " ";
    resetButton.style.display = "none";
    return;
  }

  const depCoordinates = countryCoordinates[dep];
  const desCoordinates = countryCoordinates[des];

  if (!depCoordinates || !desCoordinates) {
    messageDiv.style.display = "block";
    messageDiv.textContent = "Invalid country entered. Please try again.";
    messageDiv.style.color = "red";
    world.arcsData([]);
    listsOfFlights.textContent = " ";
    resetButton.style.display = "none";
    return;
  }

  messageDiv.textContent = "";
  messageDiv.style.display = "none";

  searchStore.setDep(dep);
  searchStore.setDes(des);

  if (searchStore.getDep() === "USA") {
    searchStore.setDep("United States");
  }

  if (searchStore.getDes() === "USA") {
    searchStore.setDes("United States");
  }

  await world.pointOfView(
    { lat: depCoordinates.lat, lng: depCoordinates.lng, altitude: 0.7 },
    2500
  );

  const arcData = [
    {
      startLat: depCoordinates.lat,
      startLng: depCoordinates.lng,
      endLat: desCoordinates.lat,
      endLng: desCoordinates.lng,
      color: ["white", "green"],
    },
  ];

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

  let previousHoveredArc = null;
  world.onArcHover((arc) => {
    if (previousHoveredArc) {
      previousHoveredArc.color = ["white", "green"];
    }

    if (arc) {
      arc.color = ["lightblue", "lightblue"];
      previousHoveredArc = arc;
    } else {
      previousHoveredArc = null;
    }

    world.arcsData([...arcData]);
  });

  world.onArcClick((arc) => {
    const index = arcData.findIndex(
      (a) =>
        a.startLat === arc.startLat &&
        a.startLng === arc.startLng &&
        a.endLat === arc.endLat &&
        a.endLng === arc.endLng
    );
    if (index !== -1) {
      arcData.splice(index, 1);
      world.arcsData([...arcData]);
    }
  });

  const flightData = await depAndDesFlights();

  console.log("flightData", flightData);
  if (flightData && flightData.length > 0) {
    populateFlightsList(flightData);
    resetButton.style.display = "inline-block";

    if (window.screen.width >= 900) {
      const aiCountryData = await callGPT(searchStore.getDes());

      const clockGptContainer = document.querySelector(".clock-gpt-container");
      const gptContainer = document.createElement("div");
      gptContainer.setAttribute("id", "ai-travel-agent");
      gptContainer.classList.add("gpt");
      clockGptContainer.appendChild(gptContainer);
      await buildAiTravelAgent(aiCountryData);
    }
  } else {
    flightsList.innerHTML = "";
    messageDiv.style.display = "inline-block";
    messageDiv.textContent = "There are no Flights!";
    messageDiv.style.color = "red";
    resetButton.style.display = "none";
  }
};

export const resetToDefault = () => {
  const depInput = document.getElementById("dep-input");
  const desInput = document.getElementById("des-input");
  const messageDiv = document.getElementById("message");
  const resetButton = document.getElementById("reset-button");
  const flightsList = document.getElementById("flights");

  const gptContainer = document.getElementById("ai-travel-agent");

  if (gptContainer) {
    gptContainer.remove();
  }

  depInput.value = "";
  desInput.value = "";
  flightsList.textContent = "";
  messageDiv.textContent = "";
  world.arcsData([]);
  resetButton.style.display = "none";

  setDefaultDeparture();
  searchStore.setDep(depInput.value);
  searchStore.setDes(desInput.value);

  if (searchStore.getDep() === "USA") {
    searchStore.setDep("United States");
  }

  if (searchStore.getDes() === "USA") {
    searchStore.setDes("United States");
  }
  globPov(world);
};

document
  .getElementById("reset-button")
  .addEventListener("click", resetToDefault);
