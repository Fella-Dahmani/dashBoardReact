import React, { useState } from "react";

type LocationData = {
  code: string;
  description: string;
  categorie: string;
  quantite: number;
  fournisseur: string;
  prix: number;
  seuilCritique: number;
  entrepot: string;
};

const Locations = () => {
  // Exemple de données, à remplacer par les données réelles
  const [data, setData] = useState<LocationData[]>([
    { code: "1", description: "Produit 1", categorie: "Cat1", quantite: 10, fournisseur: "Fournisseur A", prix: 50, seuilCritique: 5, entrepot: "Entrepot 1" },
    { code: "2", description: "Produit 2", categorie: "Cat2", quantite: 20, fournisseur: "Fournisseur B", prix: 100, seuilCritique: 10, entrepot: "Entrepot 2" },
    // Ajoutez d'autres données ici
  ]);

  const [search, setSearch] = useState({
    produit: "",
    categorie: "",
    emplacement: "",
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearch({ ...search, [name]: value.toLowerCase() });
  };

  const filteredByProduit = data.filter(item =>
    item.code.toLowerCase().includes(search.produit) ||
    item.description.toLowerCase().includes(search.produit)
  );

  const filteredByCategorie = data.filter(item =>
    item.code.toLowerCase().includes(search.categorie) ||
    item.categorie.toLowerCase().includes(search.categorie)
  );

  const filteredByEmplacement = data.filter(item =>
    item.code.toLowerCase().includes(search.emplacement) ||
    item.entrepot.toLowerCase().includes(search.emplacement)
  );

  return (
    <div>
      <h1 className="title">Emplacement</h1>

      {/* Section Par produit */}
      <div className="subTitleContainerlocation">
        <h2 className="subtitle">Par produit</h2>
        <input
          type="text"
          name="produit"
          placeholder="Recherche"
          onChange={handleSearchChange}
        />
        <button>Appliquer les filtres</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Description</th>
            <th>Categorie</th>
            <th>Quantite</th>
            <th>Fournisseur</th>
            <th>Prix</th>
            <th>Seuil Critique</th>
          </tr>
        </thead>
        <tbody>
          {filteredByProduit.map(item => (
            <tr key={item.code}>
              <td>{item.code}</td>
              <td>{item.description}</td>
              <td>{item.categorie}</td>
              <td>{item.quantite}</td>
              <td>{item.fournisseur}</td>
              <td>{item.prix}</td>
              <td>{item.seuilCritique}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Section Par catégorie */}
      <div className="subTitleContainerlocation">
        <h2 className="subtitle">Par catégorie</h2>
        <input
          type="text"
          name="categorie"
          placeholder="Recherche"
          onChange={handleSearchChange}
        />
        <button>Appliquer les filtres</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Description</th>
            <th>Categorie</th>
            <th>Quantite</th>
            <th>Fournisseur</th>
            <th>Prix</th>
            <th>Seuil Critique</th>
          </tr>
        </thead>
        <tbody>
          {filteredByCategorie.map(item => (
            <tr key={item.code}>
              <td>{item.code}</td>
              <td>{item.description}</td>
              <td>{item.categorie}</td>
              <td>{item.quantite}</td>
              <td>{item.fournisseur}</td>
              <td>{item.prix}</td>
              <td>{item.seuilCritique}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Section Par emplacement */}
      <div className="subTitleContainerlocation">
        <h2 className="subtitle">Par emplacement</h2>
        <input
          type="text"
          name="emplacement"
          placeholder="Recherche"
          onChange={handleSearchChange}
        />
        <button>Appliquer les filtres</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Description</th>
            <th>Categorie</th>
            <th>Quantite</th>
            <th>Fournisseur</th>
            <th>Seuil Critique</th>
            <th>Entrepot</th>
          </tr>
        </thead>
        <tbody>
          {filteredByEmplacement.map(item => (
            <tr key={item.code}>
              <td>{item.code}</td>
              <td>{item.description}</td>
              <td>{item.categorie}</td>
              <td>{item.quantite}</td>
              <td>{item.fournisseur}</td>
              <td>{item.seuilCritique}</td>
              <td>{item.entrepot}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Locations;
