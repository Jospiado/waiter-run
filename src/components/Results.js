import React from "react";
import "./Results.css";

function Results({ data }) {
    return (
        <div>
            <h2>Resultados</h2>
            <p>Total de viagens: {data.totalTrips}</p>
            <ul>
                {data.tripDetails.map((trip) => (
                    <li key={trip.trip}>
                        Viagem {trip.trip}: {trip.cups} taças
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Results;
