import React, { useState, useEffect } from "react";

type SupplierOrder = {
  code: string;
  description: string;
  categorie: string;
  montant: number;
  fournisseur: string;
  statut: string;
};

const SupplierOrders = () => {
  const [orders, setOrders] = useState<SupplierOrder[]>([
    
    { code: "1", description: "Order 1", categorie: "Cat1", montant: 500, fournisseur: "Fournisseur A", statut: "En cours" },
    { code: "2", description: "Order 2", categorie: "Cat2", montant: 1200, fournisseur: "Fournisseur B", statut: "Livré" },
   
  ]);

  const [filters, setFilters] = useState({
    categorie: "",
    statut: "",
    fournisseur: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value.toLowerCase() });
  };

  const filteredOrders = orders.filter(order => {
    return (
      order.categorie.toLowerCase().includes(filters.categorie) &&
      order.statut.toLowerCase().includes(filters.statut) &&
      order.fournisseur.toLowerCase().includes(filters.fournisseur)
    );
  });

  return (
    <div>
      <h1 className="title">Commandes Fournisseurs</h1>

      <div className="filterContainer">
        <h3>Filtres</h3>
        <input
          type="text"
          name="categorie"
          placeholder="Categorie..."
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="statut"
          placeholder="Statut..."
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="fournisseur"
          placeholder="Fournisseur..."
          onChange={handleInputChange}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Description</th>
            <th>Categorie</th>
            <th>Montant</th>
            <th>Fournisseur</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order.code}>
              <td>{order.code}</td>
              <td>{order.description}</td>
              <td>{order.categorie}</td>
              <td>{order.montant}</td>
              <td>{order.fournisseur}</td>
              <td>{order.statut}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SupplierOrders;
