export function gptResponseValidator(obj) {
  const allowedKeys = [
    "capital",
    "currency",
    "localLang",
    "touristSites",
    "dialCode",
    "airports",
    "bestTravelSeasons",
    "localFoods",
    "culturalTips",
    "weatherSummary",
    "exchangeRate",
  ];

  const objKeys = Object.keys(obj);

  const allKeysValid = objKeys.every((key) => allowedKeys.includes(key));

  const noExtraKeys = objKeys.length === allowedKeys.length;

  console.log("gpt response format is: ", allKeysValid && noExtraKeys);

  return allKeysValid && noExtraKeys;
}
