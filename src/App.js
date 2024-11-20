import React, { useState } from "react";
import "./App.css";
import InputForm from "./components/InputForm";
import Results from "./components/Results";
import Simulation from "./components/Simulation";

function App() {
    const [results, setResults] = useState(null);
    const [isSimulating, setIsSimulating] = useState(false); // Bloqueio do botão "Calcular"
    const [showResultsButton, setShowResultsButton] = useState(false); // Controle do botão "Ver Resultados"
    const [showResults, setShowResults] = useState(false); // Controle da exibição dos resultados

    const calculateTrips = (totalCups, trayCapacity) => {
        const trips = Math.floor(totalCups / trayCapacity);
        const remaining = totalCups % trayCapacity;
        const totalTrips = remaining > 0 ? trips + 1 : trips;

        const tripDetails = [];
        for (let i = 1; i <= totalTrips; i++) {
            if (i === totalTrips && remaining > 0) {
                tripDetails.push({ trip: i, cups: remaining });
            } else {
                tripDetails.push({ trip: i, cups: trayCapacity });
            }
        }

        setResults({ totalTrips, tripDetails });
        setIsSimulating(true); // Bloqueia o botão durante a simulação
        setShowResultsButton(false); // Esconde o botão "Ver Resultados"
        setShowResults(false); // Esconde os resultados
    };

    const handleSimulationEnd = () => {
        setIsSimulating(false); // Libera o botão "Calcular"
        setShowResultsButton(true); // Mostra o botão "Ver Resultados"
    };

    return (
        <div className="container">
            <h1>Exercício do Garçom</h1>
            <InputForm onCalculate={calculateTrips} isDisabled={isSimulating} />
            {results && (
                <Simulation
                    tripDetails={results.tripDetails}
                    onEnd={handleSimulationEnd}
                />
            )}
            {showResultsButton && (
                <button
                    className="view-results-button"
                    onClick={() => setShowResults(true)}
                >
                    Ver Resultados
                </button>
            )}
            {showResults && results && <Results data={results} />}
        </div>
    );
}

export default App;
