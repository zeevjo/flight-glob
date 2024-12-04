// Flight data
const flightData = [
    {
        "airline": { "iataCode": "BW", "icaoCode": "BWA", "name": "Caribbean Airlines" },
        "arrival": { 
            "actualRunway": null, 
            "actualTime": null, 
            "baggage": null, 
            "delay": null, 
            "estimatedRunway": null, 
            "estimatedTime": "2024-12-03T11:13:00.000", 
            "gate": null, 
            "iataCode": "GEO", 
            "icaoCode": "SYCJ", 
            "scheduledTime": "2024-12-03T11:40:00.000", 
            "terminal": null 
        },
        "departure": { 
            "actualRunway": "2024-12-03T05:14:00.000", 
            "actualTime": "2024-12-03T05:14:00.000", 
            "baggage": null, 
            "delay": "15", 
            "estimatedRunway": "2024-12-03T05:14:00.000", 
            "estimatedTime": "2024-12-03T05:00:00.000", 
            "gate": null, 
            "iataCode": "JFK", 
            "icaoCode": "KJFK", 
            "scheduledTime": "2024-12-03T05:00:00.000", 
            "terminal": "4" 
        },
        "flight": { 
            "iataNumber": "BW527", 
            "icaoNumber": "BWA527", 
            "number": "527" 
        },
        "status": "active", 
        "type": "departure"
    }
];

// Get the flights list element
const flightsList = document.getElementById('flights');

// Function to create a list item for each flight
function createFlightListItem(flight) {
    const li = document.createElement('li');
    
    li.textContent = `
        <div>
            <strong>${flight.airline.name}</strong>
            <p>Flight: ${flight.flight.iataNumber}</p>
            <p>Departure: ${flight.departure.iataCode} (Terminal ${flight.departure.terminal})</p>
            <p>Arrival: ${flight.arrival.iataCode}</p>
            <p>Status: ${flight.status}</p>
            <p>Delay: ${flight.departure.delay} minutes</p>
        </div>
    `;
    
    return li;
}

// Function to populate the flights list
function populateFlightsList() {
    // Clear any existing list items
    flightsList.textContent = '';
    
    // Add each flight to the list
    flightData.forEach(flight => {
        flightsList.appendChild(createFlightListItem(flight));
    });
}