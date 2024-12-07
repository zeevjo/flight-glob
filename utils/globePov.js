export const globePov = (world) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(`User location: Latitude ${latitude}, Longitude ${longitude}`);
          world.pointOfView({ lat: latitude, lng: longitude, altitude: 3 }, 2000);
        },
        (error) => {
          console.error("Error fetching geolocation:", error.message);
          const fallbackCoordinates = countryCoordinates.israel;
          world.pointOfView(
            { lat: fallbackCoordinates.lat, lng: fallbackCoordinates.lng, altitude: 2 },
            2000
          );
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      const fallbackCoordinates = countryCoordinates.israel;
      world.pointOfView(
        { lat: fallbackCoordinates.lat, lng: fallbackCoordinates.lng, altitude: 2 },
        2000
      );
    }
  };
  