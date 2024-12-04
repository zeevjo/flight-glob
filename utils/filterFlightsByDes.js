import { api } from "../api/api.js";
import { SECRET } from "../secret.js";
import { paths } from "../constants/paths.js";
import { getCountryCode } from "../utils/getCountryCode.js";
import { getMainAirPortCode } from "../utils/getMainAirPortCode.js";
import { getAirPortsByCountry } from "../utils/getAirPortsByCountry.js";
import { extractAPIataCodes } from "../utils/extractAPIataCodes.js";
import { filterFutureFlights } from "../utils/filterFutureFlights.js";

export async function filterFlightsByDes(des, flights) {

  const countryCode = await getCountryCode(des);

  const countryAirPorts = await getAirPortsByCountry(countryCode);

  const countryAirPortsIata = extractAPIataCodes(countryAirPorts);

  console.log("countryAirPortsIata", countryAirPortsIata);

  const flightsToDes = flights.filter((flight) =>
    countryAirPortsIata.includes(flight.arrival.iataCode)
  );

  const futureFlightsToDes = filterFutureFlights(flightsToDes);

  return futureFlightsToDes;
}
