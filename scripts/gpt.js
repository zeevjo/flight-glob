import { paths } from "../constants/paths.js";
import { SECRET } from "../secret.js";

export async function callGPT(countryName) {
  const prompt = `Generate a JSON object for the country ${countryName} with the following fields:
- "capital", "currency", "localLang", "touristSites" (3 items), "continent", "timezone", "dialCode", "airports" (2 items), 
  "flightDemand", "avgFlightDuration", "bestTravelSeasons" (2 items), "localFoods" (3 items), "culturalTips", 
  "weatherSummary", and "exchangeRate" in { "USD": "value" } format.
Ensure all fields are included and return only the JSON object.`;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${SECRET.API_KEY_GPT}`,
  };

  const body = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 300,
  };

  try {
    const response = await fetch(paths.gpt, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data.choices[0].message.content); 
    return JSON.parse(data.choices[0].message.content);
  } catch (error) {
    console.error("Error calling GPT:", error);
    return null;
  }
}

