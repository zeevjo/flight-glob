import { api } from "../api/api.js";
import { SECRET } from "../secret.js";
import { paths } from "../constants/paths.js";

export async function getAirPortsByCountry(countryCode) {
  try {
    const params = {
      key: SECRET.API_KEY,
      codeIso2Country: countryCode,
    };

    const airPorts = await api.get(
      "getAirPortsByCountry",
      paths.airPorts,
      params
    );

    if (airPorts.success === false) {
      throw new Error("No airPorts found");
    }

    return airPorts;
  } catch (error) {
    console.error("Error in getAirPortsByCountry:", error.message);
    throw error;
  }
}
