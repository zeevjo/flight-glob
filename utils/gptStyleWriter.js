export async function gptStyleWriter(response, element) {
  const delay = 150; 
  const outputDiv = document.getElementById(element);

  console.log("AI Writer:", response);

  // Treated as array of words (for sentences) or a single word
  const words = typeof response === "string" ? response.split(" ") : [response];

  for (let index = 0; index < words.length; index++) {
    const textNode = document.createTextNode(words[index] + " ");
    outputDiv.appendChild(textNode);
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
}