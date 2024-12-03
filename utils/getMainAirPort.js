import { api } from "../api/api.js";
import { SECRET } from "../secret.js";
import { paths } from "../constants/paths.js";
import { findFirstInternationalAirport } from "./getInternationalAirport.js";

export async function getMainAirPort(countryCode) {
  const params = {
    key: SECRET.API_KEY,
    codeIso2Country: countryCode,
  };

  let airPorts = await api.get(paths.airPorts, params);
  if (!airPorts.length) {
    console.error("Error: No country found with the given name.");
    return;
  }

  const mainAirPort = findFirstInternationalAirport(airPorts);

  return mainAirPort;
}