import { api } from "../api/api.js";
import { SECRET } from "../secret.js";
import { paths } from "../constants/paths.js";

export async function getAirPortInfo(airPortCode) {
  const params = {
    key: SECRET.API_KEY,
    codeIataAirport: airPortCode,
  };

  const airPortInfo = await api.get("getAirPortInfo", paths.airPortInfo, params);
  if (!airPortInfo.length) {
    console.error("Error: No Air Port Info found.");
    return;
  }

  return airPortInfo;
}