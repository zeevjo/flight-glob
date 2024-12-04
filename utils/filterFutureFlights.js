export function filterFutureFlights(flights) {
    
  const now = new Date();
  const futureFlights = flights.filter((flight) => {
    const scheduledTime = new Date(flight.departure.scheduledTime);
    return scheduledTime >= now;
  });

  return futureFlights;
}
