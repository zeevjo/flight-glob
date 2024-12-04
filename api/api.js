export const api = {
    // GET method
    get: async (callerName, url, params = {}) => {
      if (!url) {
        console.error("Error: URL is required");
        return;
      }
  
      // Construct the full URL with query parameters
      const queryString = new URLSearchParams(params).toString();
      const fullUrl = `${url}?${queryString}`;
      try {
        const response = await fetch(fullUrl, {
          method: "GET",
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log(`${callerName} Response Data:`, data);
        return data;
      } catch (error) {
        console.error("Error in GET request:", error.message);
      }
    },
  
    // POST method
    post: async (callerName, url, body = {}) => {
      if (!url) {
        console.error("Error: URL is required");
        return;
      }
  
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log(`${callerName} Response Data:`, data);
        return data;
      } catch (error) {
        console.error("Error in POST request:", error.message);
      }
    },
  };
  