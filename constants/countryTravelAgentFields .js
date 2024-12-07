export function countryTravelAgentFields(aiCountryData) {
  return [
    { label: "Capital", value: aiCountryData.capital, idSuffix: "capital" },
    { label: "Currency", value: aiCountryData.currency, idSuffix: "currency" },
    {
      label: "Local Language",
      value: aiCountryData.localLang,
      idSuffix: "localLang",
    },
    {
      label: "Tourist Sites",
      value: aiCountryData.touristSites.join(", "),
      idSuffix: "touristSites",
    },
    { label: "Dial Code", value: aiCountryData.dialCode, idSuffix: "dialCode" },
    {
      label: "Airports",
      value: aiCountryData.airports
        .map((airport) => airport.replace(/\bairport\b/gi, ""))
        .join(", "),
      idSuffix: "airports",
    },
    {
      label: "Best Travel Seasons",
      value: aiCountryData.bestTravelSeasons.join(", "),
      idSuffix: "bestTravelSeasons",
    },
    {
      label: "Local Foods",
      value: aiCountryData.localFoods.join(", "),
      idSuffix: "localFoods",
    },
    {
      label: "Cultural Tips",
      value: aiCountryData.culturalTips,
      idSuffix: "culturalTips",
    },
    {
      label: "Weather Summary",
      value: aiCountryData.weatherSummary,
      idSuffix: "weatherSummary",
    },
    {
      label: "Exchange Rate (USD)",
      value: aiCountryData.exchangeRate.USD,
      idSuffix: "exchangeRate",
    },
  ];
}