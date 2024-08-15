import React, { useState } from "react";

// Définir un type pour les données de stock
type StockItem = {
    code: string;
    description: string;
    categorie: string;
    quantite: number;
    fournisseur: string;
    prixAchat: number;
    prixVente: number;
    statut: string;
    clients: string;
    date: string;
};

const StockMouvements = () => {
    const [selectedType, setSelectedType] = useState<string>("1");
    const [filters, setFilters] = useState({
        categorie: "",
        statut: "",
        clients: "",
        dateDebut: "",
        dateFin: "",
    });

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value.toLowerCase(),
        }));
    };

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedType(e.target.value);
    };

    const applyFilters = () => {
        // Appliquer les filtres ici pour filtrer les données
        console.log("Filtres appliqués:", filters);
        // Filtrer les données en fonction de selectedType et des filtres
    };

    const getDataForSelectedType = (): StockItem[] => {
        switch (selectedType) {
            case "1":
                return [
                    // Données pour les entrées de stock
                    { code: "E1", description: "Entrée 1", categorie: "Cat1", quantite: 100, fournisseur: "F1", prixAchat: 10, prixVente: 15, statut: "En stock", clients: "Client A", date: "2023-08-10" },
                    // Ajoutez plus d'éléments ici...
                ];
            case "2":
                return [
                    // Données pour les sorties de stock
                    { code: "S1", description: "Sortie 1", categorie: "Cat2", quantite: 50, fournisseur: "F2", prixAchat: 20, prixVente: 30, statut: "Sorti", clients: "Client B", date: "2023-08-11" },
                    // Ajoutez plus d'éléments ici...
                ];
            case "3":
                return [
                    // Données pour les transferts de stock
                    { code: "T1", description: "Transfert 1", categorie: "Cat3", quantite: 75, fournisseur: "F3", prixAchat: 15, prixVente: 25, statut: "Transféré", clients: "Client C", date: "2023-08-12" },
                    // Ajoutez plus d'éléments ici...
                ];
            default:
                return [];
        }
    };

    const filteredData = getDataForSelectedType().filter((item) => {
        // Appliquer les filtres aux données ici
        const matchesCategorie = item.categorie.toLowerCase().includes(filters.categorie);
        const matchesStatut = item.statut.toLowerCase().includes(filters.statut);
        // Filtrer par dates
        const matchesDateDebut = filters.dateDebut ? new Date(item.date) >= new Date(filters.dateDebut) : true;

        return matchesCategorie && matchesStatut  && matchesDateDebut;
    });

    return (
        <div>
            <h1 className="title">Mouvements des stocks</h1>

            <div className="subTitleContainer">
                <div>
                    <select value={selectedType} onChange={handleTypeChange}>
                        <option value="1">Entrées de stock</option>
                        <option value="2">Sorties de stock</option>
                        <option value="3">Transferts de stock</option>
                    </select>
                </div>
            </div>

            <div className="filterContainer">
                <h3>Filtres</h3>
                <input
                    type="text"
                    placeholder="Categorie..."
                    name="categorie"
                    value={filters.categorie}
                    onChange={handleFilterChange}
                />
                <input
                    type="text"
                    placeholder="Statut..."
                    name="statut"
                    value={filters.statut}
                    onChange={handleFilterChange}
                />
                <input
                    type="date"
                    placeholder="Date Operation"
                    name="dateDebut"
                    value={filters.dateDebut}
                    onChange={handleFilterChange}
                />
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Description</th>
                        <th>Categorie</th>
                        <th>Quantite</th>
                        <th>Fournisseur</th>
                        <th>Prix Achat</th>
                        <th>Prix Vente</th>
                        <th>Date Operation</th>

                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.code}</td>
                            <td>{item.description}</td>
                            <td>{item.categorie}</td>
                            <td>{item.quantite}</td>
                            <td>{item.fournisseur}</td>
                            <td>{item.prixAchat}</td>
                            <td>{item.prixVente}</td>
                            <td>{item.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StockMouvements;
