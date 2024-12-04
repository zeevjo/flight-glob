import { api } from "../api/api.js";
import { SECRET } from "../secret.js";
import { paths } from "../constants/paths.js";
import { getCountryCode } from "../utils/getCountryCode.js";
import { getMainAirPortCode } from "../utils/getMainAirPortCode.js";

export async function filterFlightsByDes(des, flights) {

  console.log("des", des)
  console.log("flights", flights);
  

  const countryCode = await getCountryCode(des);

  const airPortCode = await getMainAirPortCode(countryCode);

  console.log("desAirPortCode", airPortCode);
  

  const data = flights.filter(flight => flight.arrival?.iataCode === airPortCode);

  return data;
}
