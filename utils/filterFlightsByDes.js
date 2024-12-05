import { getCountryCode } from "../utils/getCountryCode.js";
import { getAirPortsByCountry } from "../utils/getAirPortsByCountry.js";
import { extractAPIataCodes } from "../utils/extractAPIataCodes.js";
import { filterFutureFlights } from "../utils/filterFutureFlights.js";
import { filterFlightsByFields } from "../utils/filterFlightsByFields.js";

export async function filterFlightsByDes(des, flights) {
  try {
    const countryCode = await getCountryCode(des);

    const countryAirPorts = await getAirPortsByCountry(countryCode);

    const countryAirPortsIata = extractAPIataCodes(countryAirPorts);

    const flightsToDes = flights.filter((flight) =>
      countryAirPortsIata.includes(flight.arrival.iataCode)
    );


    console.log("flightsToDes", flightsToDes);
    

    const futureFlightsToDes = filterFutureFlights(flightsToDes);

    // console.log('%c futureFlightsToDes', 'color: green; font-weight: bold;', futureFlightsToDes);

    const haveAllDataFlights = filterFlightsByFields(futureFlightsToDes);

    const firstThree = haveAllDataFlights.slice(0, 3);

    return firstThree;
  } catch (error) {
    console.error("Error in filterFlightsByDes:", error.message);
    throw error;
  }
}
