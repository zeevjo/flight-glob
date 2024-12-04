import { api } from "../api/api.js";
import { SECRET } from "../secret.js";
import { paths } from "../constants/paths.js";

export async function getCountryCode(country) {
  try {
    const params = {
      key: SECRET.API_KEY,
      nameCountry: country,
    };

    const countryData = await api.get(
      "getCountryCode",
      paths.countryData,
      params
    );

    if (countryData.success === false) {
      throw new Error("No country code found");
    }

    return countryData[0].codeIso2Country;
  } catch (error) {
    console.error("Error in getCountryCode:", error.message);
    return ""; 
  }
}
