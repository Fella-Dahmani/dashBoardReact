import React, { useState, useEffect } from "react";
import axios from "axios";

type LocationData = {
  id: number;
  codeProduit: string;
  nom: string;
  categorie: {
    code: string;
    description: string;
  };
  description: string;
  seuilCritique: number;
  prixU: number;
  dateAchat: string;
  dateExpiration: string;
  quantiteEnStock: number;
  quantiteMaximale: number;
  prixVente: number;
  fournisseur: {
    id: number;
    codeFournisseur: string;
    nom: string;
    prenom: string;
    statut: boolean;
    email: string;
    tel: string;
    adresse: string;
    nrc: string;
  };
  emplacement: {
    id: number;
    typeEmplacement: string;
    capaciteMax: number;
    quantiteActuelle: number;
    statut: string;
    nomEmplacement: string;
    descEmplacement: string;
    codeEmp: string;
  };
};


const Locations = () => {
  const [productsData, setProductsData] = useState<LocationData[]>([]);
  const [categoriesData, setCategoriesData] = useState<LocationData[]>([]);
  const [locationData, setLocationData] = useState<LocationData[]>([]);

  // Fetch data by product
  const fetchProduits = async (keyword: string = "") => {
    try {
      const response = await axios.get("https://stockvisiobackend.onrender.com/api/emplacements/produits/recherche", {
        params: { keyword },
      });
      setProductsData(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des produits :", error);
    }
  };

  // Fetch data by category
  const fetchCategorie = async (categorie: string = "") => {
    try {
      const response = await axios.get("https://stockvisiobackend.onrender.com/api/emplacements/produits/categorie", {
        params: { categorie },
      });
      setCategoriesData(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des produits par catégorie :", error);
    }
  };

  // Fetch data by location
  const fetchEmplacement = async (emplacement: string = "") => {
    try {
      const response = await axios.get("https://stockvisiobackend.onrender.com/api/emplacements/produits/emplacement", {
        params: { emplacement },
      });
      setLocationData(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des produits par emplacement :", error);
    }
  };

  useEffect(() => {
      fetchProduits();
      fetchCategorie();
      fetchEmplacement()
  }, []);

  return (
    <div>
      <h1 className="title">Emplacement</h1>

      {/* Product */}
      <div className="subTitleContainerlocation">
        <h2 className="subtitle">Par produit</h2>
        <input
          type="text"
          name="produit"
          placeholder="Recherche par code ou description"
          onChange={(e) => fetchProduits(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Code Produit</th>
            <th>Nom</th>
            <th>Categorie</th>
            <th>Description</th>
            <th>Quantité en Stock</th>
            <th>Prix Unitaire</th>
            <th>Prix de Vente</th>
            <th>Seuil Critique</th>
            <th>Fournisseur</th>
          </tr>
        </thead>
        <tbody>
          {productsData.map((item) => (
            <tr key={item.id}>
              <td>{item.codeProduit}</td>
              <td>{item.nom}</td>
              <td>{item.categorie.description}</td>
              <td>{item.description}</td>
              <td>{item.quantiteEnStock}</td>
              <td>{item.prixU}</td>
              <td>{item.prixVente}</td>
              <td>{item.seuilCritique}</td>
              <td>{`${item.fournisseur.nom} ${item.fournisseur.prenom}`}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Catégorie */}
      <div className="subTitleContainerlocation">
        <h2 className="subtitle">Par catégorie</h2>
        <input
          type="text"
          name="categorie"
          placeholder="Recherche par catégorie"
          onChange={(e) => fetchCategorie(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Code Produit</th>
            <th>Nom</th>
            <th>Categorie</th>
            <th>Description</th>
            <th>Quantité en Stock</th>
            <th>Prix Unitaire</th>
            <th>Prix de Vente</th>
            <th>Seuil Critique</th>
            <th>Fournisseur</th>
          </tr>
        </thead>
        <tbody>
          {categoriesData.map((item) => (
            <tr key={item.id}>
              <td>{item.codeProduit}</td>
              <td>{item.nom}</td>
              <td>{item.categorie.description}</td>
              <td>{item.description}</td>
              <td>{item.quantiteEnStock}</td>
              <td>{item.prixU}</td>
              <td>{item.prixVente}</td>
              <td>{item.seuilCritique}</td>
              <td>{`${item.fournisseur.nom} ${item.fournisseur.prenom}`}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Location*/}
      <div className="subTitleContainerlocation">
        <h2 className="subtitle">Par emplacement</h2>
        <input
          type="text"
          name="emplacement"
          placeholder="Recherche par emplacement"
          onChange={(e) => fetchEmplacement(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Code Produit</th>
            <th>Nom</th>
            <th>Categorie</th>
            <th>Description</th>
            <th>Quantité en Stock</th>
            <th>Prix Unitaire</th>
            <th>Prix de Vente</th>
            <th>Seuil Critique</th>
            <th>Fournisseur</th>
            <th>Entrepot</th>
          </tr>
        </thead>
        <tbody>
          {locationData.map((item) => (
            <tr key={item.id}>
              <td>{item.codeProduit}</td>
              <td>{item.nom}</td>
              <td>{item.categorie.description}</td>
              <td>{item.description}</td>
              <td>{item.quantiteEnStock}</td>
              <td>{item.prixU}</td>
              <td>{item.prixVente}</td>
              <td>{item.seuilCritique}</td>
              <td>{`${item.fournisseur.nom} ${item.fournisseur.prenom}`}</td>
              <td>{item.emplacement.nomEmplacement}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Locations;
