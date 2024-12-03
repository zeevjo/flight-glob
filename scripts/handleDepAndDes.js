import { countryCoordinates } from "../constants/countryCoordinates.js";
import { world } from "./glob.js";

export const handleDepAndDes = () => {
    const dep = document.getElementById("dep-input").value.trim();
    const des = document.getElementById("des-input").value.trim();
    const messageDiv = document.getElementById("message");
  
    if (!dep || !des) {
      messageDiv.textContent = "Both departure and destination are required.";
      messageDiv.style.color = "red";
      return;
    }
  
    const depCoordinates = countryCoordinates[dep];
    const desCoordinates = countryCoordinates[des];
  
    if (!depCoordinates || !desCoordinates) {
      messageDiv.textContent = "Invalid country entered. Please try again.";
      messageDiv.style.color = "red";
      return;
    }
  
    messageDiv.textContent = `Flight path set from ${dep} to ${des}.`;
    messageDiv.style.color = "green";
  

    world.pointOfView({ lat: depCoordinates.lat, lng: depCoordinates.lng, altitude: 0.7 }, 2000);
  
    setTimeout(() => {
      world.pointOfView({ lat: desCoordinates.lat, lng: desCoordinates.lng, altitude: 0.7 }, 2000);
    }, 2000);
  };
  