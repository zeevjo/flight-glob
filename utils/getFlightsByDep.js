import { api } from "../api/api.js";
import { SECRET } from "../secret.js";
import { paths } from "../constants/paths.js";

export async function getFlightsByDep(airPortCode) {
  const params = {
    key: SECRET.API_KEY,
    iataCode: airPortCode,
    type: "departure",
  };

  let todaysFlights = await api.get(paths.todaysFlights, params);
  if (!todaysFlights.length) {
    console.error("Error: today flights.");
    return;
  }

  console.log(todaysFlights);
  

  return todaysFlights;
}