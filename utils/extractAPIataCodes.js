export function extractAPIataCodes(airports) {
  return airports.map((airport) => airport.codeIataAirport);
}
