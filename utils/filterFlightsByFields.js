export function filterFlightsByFields(flights) {

  const requiredFields = [
    "airline.name",
    "flight.iataNumber",
    "departure.iataCode",
    "departure.actualTime",
    "departure.scheduledTime",
    "arrival.iataCode",
    "arrival.actualTime",
    "arrival.scheduledTime",
  ];

  return flights.filter((item) => {
    return requiredFields.every((field) => {
      const value = field
        .split(".")
        .reduce((acc, key) => acc && acc[key], item);
      return value !== "empty" && value !== "";
    });
  });
}