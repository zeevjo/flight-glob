import { api } from "../api/api.js";
import { SECRET } from "../secret.js";
import { paths } from "../constants/paths.js";

export async function getAirPortInfo(airPortCode) {
  try {
    const params = {
      key: SECRET.API_KEY,
      codeIataAirport: airPortCode,
    };

    const airPortInfo = await api.get("getAirPortInfo", paths.airPortInfo, params);

    if (airPorts.success === false) {
      throw new Error("No Airport Info found.");
    }

    return airPortInfo;
  } catch (error) {
    console.error("Error in getAirPortInfo:", error.message);
    throw error;
  }
}