import { gptStyleWriter } from "./gptStyleWriter.js";
import { countryTravelAgentFields } from "../constants/countryTravelAgentFields .js";

export async function buildAiTravelAgent(aiCountryData) {
  const gptContainer = document.getElementById("ai-travel-agent");

  if (!gptContainer) {
    console.error("Container with id 'ai-travel-agent' not found.");
    return;
  }

  for (const { label, value, idSuffix } of countryTravelAgentFields(aiCountryData)) {
    const fieldContainer = document.createElement("div");
    fieldContainer.setAttribute("id", `ai-travel-agent-${idSuffix}`);
    gptContainer.appendChild(fieldContainer);
    await gptStyleWriter(`${label}: ${value}`, `ai-travel-agent-${idSuffix}`);
  }
}
