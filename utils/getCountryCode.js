import { api } from "../api/api.js";
import { SECRET } from "../secret.js";
import { paths } from "../constants/paths.js";

export async function getCountryCode(country) {
  const params = {
    key: SECRET.API_KEY,
    nameCountry: country,
  };

  const countryData = await api.get(paths.countryData, params);
  if (!countryData.length) {
    console.error("Error: No country found with the given name.");
    return;
  }

  return countryData[0].codeIso2Country;
}