function findFirstInternationalAirport(array) {
    return array.find((airport) =>
      airport.nameAirport.toLowerCase().includes("international")
    );
  }