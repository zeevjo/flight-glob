const api = {
    // GET method
    get: async (url, params = {}) => {
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
        console.log("GET Response Data:", data);
        return data;
      } catch (error) {
        console.error("Error in GET request:", error.message);
      }
    },
  
    // POST method
    post: async (url, body = {}) => {
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
        console.log("POST Response Data:", data);
        return data;
      } catch (error) {
        console.error("Error in POST request:", error.message);
      }
    },
  };
  
//   // Example usage
  
//   // 1. GET request
//   api.get("https://jsonplaceholder.typicode.com/users", { id: 1 });
  
//   // 2. POST request
//   api.post("https://jsonplaceholder.typicode.com/posts", {
//     title: "foo",
//     body: "bar",
//     userId: 1,
//   });
  