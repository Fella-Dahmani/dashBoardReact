import "../css/inventaires.css";
import listAsset from "../assets/liste.png";
import React, { useState, useEffect } from "react";
import axios from "axios";

type Produit = {
    id: number;
    codeProduit: string;
    nom: string;
    description: string;
    categorie: {
        code: string;
        description: string;
    };
    seuilCritique: number;
    prixU: number;
    quantiteEnStock: number;
    prixVente: number;
    fournisseur: {
        id: number;
        codeFournisseur: string;
        nom: string;
    };
};


const Inventaires = () => {
    const [produits, setProduits] = useState<Produit[]>([]);
    const [filteredProduits, setFilteredProduits] = useState<Produit[]>([]);
    const [activeButton, setActiveButton] = useState<string | null>(null);
    const [categorie, setCategorie] = useState("");
    const [fournisseur, setFournisseur] = useState("");

    const toggleButton = (buttonName: string) => {
        setActiveButton(prevState => (prevState === buttonName ? null : buttonName));
    };

    const applyFilters = () => {
        let params: any = {};
        if (activeButton === "rupture") {
            params.rupture = true;
        }
        if (activeButton === "surstock") {
            params.surstock = true;
        }
        if (categorie) {
            params.categorie_id = categorie;
        }
        if (fournisseur) {
            params.fournisseur_id = fournisseur;
        }

        axios.get("http://localhost:8080/api/produits/filtered", { params })
            .then(response => {
                setFilteredProduits(response.data);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des produits :", error);
            });
    };

    useEffect(() => {
        applyFilters(); 
    }, [activeButton, categorie, fournisseur]);

    return (
        <div>
            <h1 className="title">Inventaires</h1>

            <div className="subTitleContainer">
                <img src={listAsset} alt="" />
                <h2 className="subtitle">Liste des produits</h2>
            </div>

            <div className="filterContainer">
                <h3>Filtres</h3>
                <button
                    className={activeButton === "rupture" ? "btnPrimary" : ""}
                    onClick={() => toggleButton("rupture")}
                >Rupture de stock</button>
                <button
                    className={activeButton === "surstock" ? "btnPrimary" : ""}
                    onClick={() => toggleButton("surstock")}
                >Surstock</button>

                <input
                    type="text"
                    placeholder="Categorie..."
                    value={categorie}
                    onChange={(e) => setCategorie(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Fournisseur..."
                    value={fournisseur}
                    onChange={(e) => setFournisseur(e.target.value)}
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
                    </tr>
                </thead>
                <tbody>
                    {filteredProduits.map((produit) => (
                        <tr key={produit.id}>
                        <td>{produit.codeProduit}</td>
                        <td>{produit.nom}</td>
                        <td>{produit.categorie.description}</td>
                        <td>{produit.quantiteEnStock}</td>
                        <td>{produit.fournisseur.nom}</td>
                        <td>{produit.prixU}</td>
                        <td>{produit.prixVente}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Inventaires;
