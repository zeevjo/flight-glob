import { api } from "../api/api.js";
import { SECRET } from "../secret.js";
import { paths } from "../constants/paths.js";
import { findFirstInternationalAirport } from "./getInternationalAirport.js";

export async function getMainAirPortCode(countryCode) {
  try {
    const params = {
      key: SECRET.API_KEY,
      codeIso2Country: countryCode,
    };

    const airPorts = await api.get(
      "getMainAirPortCode",
      paths.airPorts,
      params
    );

    if (airPorts.success === false) {
      throw new Error("No airports found");
    }

    const mainAirPort = findFirstInternationalAirport(airPorts);

    if (!mainAirPort) {
      throw new Error("No main international airport found");
    }

    return mainAirPort.codeIataAirport;
  } catch (error) {
    console.error("Error in getMainAirPortCode:", error.message);
    throw error;
  }
}
