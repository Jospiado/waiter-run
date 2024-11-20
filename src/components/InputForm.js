import React, { useState } from "react";
import "./InputForm.css";

function InputForm({ onCalculate, isDisabled }) {
    const [trayCapacity, setTrayCapacity] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const totalCups = 300; // Valor fixo
        if (trayCapacity) {
            onCalculate(totalCups, parseInt(trayCapacity));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Total de Taças:
                <input
                    type="text"
                    value="300"
                    readOnly
                    className="readonly-input"
                />
            </label>
            <label>
                Capacidade da Bandeja:
                <input
                    type="number"
                    value={trayCapacity}
                    onChange={(e) => setTrayCapacity(e.target.value)}
                />
            </label>
            <button type="submit" disabled={isDisabled}>
                {isDisabled ? "Calculando..." : "Calcular"}
            </button>
        </form>
    );
}

export default InputForm;
