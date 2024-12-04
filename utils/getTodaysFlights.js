import { api } from "../api/api.js";
import { SECRET } from "../secret.js";
import { paths } from "../constants/paths.js";

export async function getTodaysFlights(airPortCode) {
  try {
    const params = {
      key: SECRET.API_KEY,
      iataCode: airPortCode,
      type: "departure",
    };

    const todaysFlights = await api.get(
      "getTodaysFlights",
      paths.todaysFlights,
      params
    );

    if (todaysFlights.success === false) {
      throw new Error("Error: No Record Found!");
    }

    return todaysFlights;
  } catch (error) {
    console.error("Error in getTodaysFlights:", error.message);
    return "";
  }
}
