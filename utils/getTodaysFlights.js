import { api } from "../api/api.js";
import { SECRET } from "../secret.js";
import { paths } from "../constants/paths.js";

export async function getTodaysFlights(airPortCode) {
  const params = {
    key: SECRET.API_KEY,
    iataCode: airPortCode,
    type: "departure",
  };

  const todaysFlights = await api.get("getTodaysFlights",paths.todaysFlights, params);

  console.log("todaysFlights", todaysFlights);
  
  if (!todaysFlights.length) {
    console.error("Error: No country found with the given name.");
    return;
  }

  return todaysFlights;
}