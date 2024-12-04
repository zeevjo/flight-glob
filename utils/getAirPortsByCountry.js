import { api } from "../api/api.js";
import { SECRET } from "../secret.js";
import { paths } from "../constants/paths.js";
import { findFirstInternationalAirport } from "./getInternationalAirport.js";

export async function getAirPortsByCountry(countryCode) {
  const params = {
    key: SECRET.API_KEY,
    codeIso2Country: countryCode,
  };

  const airPorts = await api.get("getAirPortsByCountry",paths.airPorts, params);
  if (!airPorts.length) {
    console.error("Error: No airPorts found");
    return;
  }

  return airPorts;
}

console.log(await getAirPortsByCountry('IL'));
