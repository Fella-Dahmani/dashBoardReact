import React, { useState } from "react";

const [activeForm, setActiveForm] = useState <
    "ventes" | "achats" | null >(null);

const ventes = () => {

}

const DashBoard = () => {
    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    );
};

export default DashBoard;