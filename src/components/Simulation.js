import React, { useState, useEffect } from "react";
import "./Simulation.css";

function Simulation({ tripDetails, onEnd }) {
    const [currentTrip, setCurrentTrip] = useState(0);
    const [currentTable, setCurrentTable] = useState(0);
    const [remainingCups, setRemainingCups] = useState(0); // Taças restantes na bandeja
    const tables = [1, 2, 3]; // Número das mesas

    useEffect(() => {
        if (tripDetails && currentTrip < tripDetails.length) {
            const totalCups = tripDetails[currentTrip].cups;
            const cupsPerTable = Math.floor(totalCups / tables.length);
            const remaining = totalCups % tables.length;

            // Recarrega a bandeja no início da viagem
            if (currentTable === 0 && remainingCups === 0) {
                setRemainingCups(totalCups); // Carrega todas as taças
            }

            const timer = setTimeout(() => {
                // Calcula as taças que o garçom entrega nesta mesa
                const cupsToDeliver =
                    currentTable === tables.length - 1
                        ? cupsPerTable + remaining // Última mesa recebe o restante
                        : cupsPerTable;

                // Atualiza as taças restantes na bandeja
                setRemainingCups((prev) => prev - cupsToDeliver);

                // Avança para a próxima mesa
                setCurrentTable((prevTable) => {
                    const nextTable = (prevTable + 1) % tables.length;

                    // Se for a última mesa, avança para a próxima viagem
                    if (nextTable === 0) {
                        setCurrentTrip((prevTrip) => prevTrip + 1);
                    }

                    // Quando todas as viagens terminarem, chama onEnd
                    if (
                        nextTable === 0 &&
                        currentTrip === tripDetails.length - 1
                    ) {
                        setTimeout(onEnd, 1000); // Atraso para finalizar a última entrega
                    }

                    return nextTable;
                });
            }, 1000); // Tempo entre movimentos (1 segundo)

            return () => clearTimeout(timer);
        }
    }, [
        currentTrip,
        currentTable,
        remainingCups,
        tripDetails,
        tables.length,
        onEnd,
    ]);

    return (
        <div className="simulation-container">
            <div className="trip-indicator">
                {currentTrip < tripDetails.length
                    ? `Viagem ${currentTrip + 1}`
                    : "Todas as viagens concluídas!"}
            </div>
            <div className="tables">
                {tables.map((table, index) => (
                    <div key={index} className={`table table-${table}`}>
                        🪑 Mesa {table}
                    </div>
                ))}
            </div>
            {tripDetails && currentTrip < tripDetails.length ? (
                <div
                    className="waiter"
                    style={{
                        transform: `translateX(${currentTable * 150}px)`,
                    }}
                >
                    <div className="cup-count">{remainingCups} 🍷</div>
                    <span className="garconzinho">🧑‍🍳</span>
                    <span className="bandeja">🍷</span>
                </div>
            ) : (
                <p>Todas as taças foram entregues! 🥳</p>
            )}
        </div>
    );
}

export default Simulation;
