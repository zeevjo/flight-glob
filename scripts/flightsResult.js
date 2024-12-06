const flightsList = document.getElementById('flights');

function createFlightListItem(flight) {
    const li = document.createElement('li');
    const div = document.createElement('div');
    
    
    const airline = document.createElement('strong');
    airline.textContent = flight.airline.name;

    const flightNumber = document.createElement('p');
    flightNumber.textContent = `Flight: ${flight.flight.iataNumber}`;

    const departureAirport = document.createElement('p');
    departureAirport.textContent = `Departure Airport: ${flight.departure.iataCode}`;

    const departureTime = document.createElement('p');
    const formattedDepartureTime = new Date(flight.departure.actualTime || flight.departure.scheduledTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    departureTime.textContent = `Takeoff Time: ${formattedDepartureTime}`;

    const arrivalAirport = document.createElement('p');
    arrivalAirport.textContent = `Arrival Airport: ${flight.arrival.iataCode}`;

    const arrivalTime = document.createElement('p');
    const formattedArrivalTime = new Date(flight.arrival.actualTime || flight.arrival.scheduledTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    arrivalTime.textContent = `Landing Time: ${formattedArrivalTime}`;

    div.appendChild(airline);
    div.appendChild(flightNumber);
    div.appendChild(departureAirport);
    div.appendChild(departureTime);
    div.appendChild(arrivalAirport);
    div.appendChild(arrivalTime);

    li.appendChild(div);

    return li;
}




export function populateFlightsList(flightData) {
    // Clear any existing list items
    flightsList.textContent = '';

    flightData.forEach(flight => {
        flightsList.appendChild(createFlightListItem(flight));
    });
}