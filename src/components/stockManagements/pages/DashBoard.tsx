import React, { useState } from "react";





const [activeForm, setActiveForm] = useState <
    "ventes" | "achats" | "ruptures" | "surstocks" | null 
>(null);



const handleCardClick = (
    formType: "ventes" | "achats" | "ruptures" | "surstocks"
) => {
    setActiveForm(formType);
};






const DashBoard = () => {
    return (
        <>
            <div>
                <h1>Dashboard</h1>
            </div>
            
            <div className="CardConatiner">
                <div
                    className={`card ${activeForm === "ventes" ? "clicked" : ""}`}
                    onClick={() => handleCardClick("ventes")}
                >
                    <h3>Les ventes</h3>
                    <div className="ventesStats"></div>
                </div>
            </div>

            <div className="CardConatiner">
                <div
                    className={`card ${activeForm === "achats" ? "clicked" : ""}`}
                    onClick={() => handleCardClick("achats")}
                >
                    <h3>Les ventes</h3>
                    <div className="achatsStats"></div>
                </div>
            </div>

            <div className="CardConatiner">
                <div
                    className={`card ${activeForm === "ruptures" ? "clicked" : ""}`}
                    onClick={() => handleCardClick("ruptures")}
                >
                    <h3>Les ventes</h3>
                    <div className="vrupturesStats"></div>
                </div>
            </div>

            <div className="CardConatiner">
                <div
                    className={`card ${activeForm === "surstocks" ? "clicked" : ""}`}
                    onClick={() => handleCardClick("surstocks")}
                >
                    <h3>Les ventes</h3>
                    <div className="surstocksStats"></div>
                </div>
            </div>


        </>
    );
};

export default DashBoard;