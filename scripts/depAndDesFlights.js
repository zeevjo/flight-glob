import { searchStore } from "../constants/searchStore.js";
import { filterFlightsByDes } from "../utils/filterFlightsByDes.js";
import { getCountryCode } from "../utils/getCountryCode.js";
import { getMainAirPortCode } from "../utils/getMainAirPortCode.js";
import { getTodaysFlights } from "../utils/getTodaysFlights.js";

export async function depAndDesFlights() {
  const countryCode = await getCountryCode(searchStore.getDep());

  const airPortCode = await getMainAirPortCode(countryCode);

  const todaysFlights = await getTodaysFlights(airPortCode);

  const flightsFilterByDes = await filterFlightsByDes(
    searchStore.getDes(),
    todaysFlights
  );

  return flightsFilterByDes;
}
