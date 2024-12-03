import { countryCoordinates } from "../constants/countryCoordinates.js";
import { world } from "./glob.js";

export const handleDepAndDes = () => {
    const clickedLocations = [];
    const routes = [];
    const dep = document.getElementById("dep-input").value.trim();
    const des = document.getElementById("des-input").value.trim();
    const messageDiv = document.getElementById("message");

    // Validate that both dep and des are provided
    if (!dep || !des) {
        messageDiv.textContent = "Both departure and destination are required.";
        messageDiv.style.color = "red";
        return;
    }

    // Validate that both dep and des are valid countries
    const depCoordinates = countryCoordinates[dep];
    const desCoordinates = countryCoordinates[des];

    if (!depCoordinates || !desCoordinates) {
        messageDiv.textContent = "Invalid country entered. Please try again.";
        messageDiv.style.color = "red";
        return;
    }

    // Set success message
    messageDiv.textContent = `Flight path set from ${dep} to ${des}.`;
    messageDiv.style.color = "green";

    // Move globe to departure country
    world.pointOfView({ lat: depCoordinates.lat, lng: depCoordinates.lng, altitude: 0.7 }, 2000);

    // Initialize arcData
    const arcData = [
        {
            startLat: depCoordinates.lat,
            startLng: depCoordinates.lng,
            endLat: desCoordinates.lat,
            endLng: desCoordinates.lng,
            color: ["white", "green"], // Arc starts white and ends green
        },
    ];

    // Add the arc to the globe
    world.arcsData(arcData)
        .arcStartLat((d) => d.startLat)
        .arcStartLng((d) => d.startLng)
        .arcEndLat((d) => d.endLat)
        .arcEndLng((d) => d.endLng)
        .arcColor((d) => d.color)
        .arcStroke(1.2); // Customize arc thickness

    // Zoom out to show the entire arc after a delay
    setTimeout(() => {
        world.pointOfView({ lat: desCoordinates.lat, lng: desCoordinates.lng, altitude: 2.5 }, 4000);
    }, 2000);

    // Add hover interaction
    let previousHoveredArc = null;

    world.onArcHover((arc) => {
        // Reset the previously hovered arc's color
        if (previousHoveredArc) {
            previousHoveredArc.color = ["white", "green"];
        }

        // Highlight the currently hovered arc
        if (arc) {
            arc.color = ["lightblue", "lightblue"];
            previousHoveredArc = arc;
        } else {
            previousHoveredArc = null;
        }

        // Reapply updated arcsData
        world.arcsData([...arcData]);
    });

    // Add click interaction to delete arcs
    world.onArcClick((arc) => {
        // Remove the clicked arc from arcData
        const index = arcData.findIndex(
            (a) =>
                a.startLat === arc.startLat &&
                a.startLng === arc.startLng &&
                a.endLat === arc.endLat &&
                a.endLng === arc.endLng
        );

        if (index !== -1) {
            arcData.splice(index, 1); // Remove arc from data
            world.arcsData([...arcData]); // Update globe
        }
    });
};

