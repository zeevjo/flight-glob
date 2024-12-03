import { countryCoordinates } from "../constants/countryCoordinates.js";

export const setDefaultDeparture = () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        let defaultCountry = "Israel";
        for (const [country, coords] of Object.entries(countryCoordinates)) {
          if (Math.abs(coords.lat - latitude) < 5 && Math.abs(coords.lng - longitude) < 5) {
            defaultCountry = country;
            break;
          }
        }
        document.getElementById("dep-input").value = defaultCountry;
      },
      (error) => {
        console.error("Error getting location:", error.message);
        document.getElementById("dep-input").value = "Israel";
      }
    );
  } else {
    document.getElementById("dep-input").value = "Israel";
  }
};