import React, { useState, useEffect } from "react";

type Order = {
  code: string;
  description: string;
  categorie: string;
  montant: number;
  client: string;
  statut: string;
};

const CustomerOrders = () => {
  const [orders, setOrders] = useState<Order[]>([
    
    { code: "1", description: "Order 1", categorie: "Cat1", montant: 100, client: "Client1", statut: "Livré" },
    { code: "2", description: "Order 2", categorie: "Cat2", montant: 200, client: "Client2", statut: "En attente" },
    { code: "3", description: "Order 3", categorie: "Cat1", montant: 300, client: "Client1", statut: "Annulé" },
  ]);

  const [filteredOrders, setFilteredOrders] = useState<Order[]>(orders);
  const [categorie, setCategorie] = useState("");
  const [statut, setStatut] = useState("");
  const [client, setClient] = useState("");
  const [quantite, setQuantite] = useState<string>("");

  const applyFilters = () => {
    let updatedOrders = orders;

    if (categorie) {
      updatedOrders = updatedOrders.filter(order =>
        order.categorie.toLowerCase().includes(categorie.toLowerCase())
      );
    }

    if (statut) {
      updatedOrders = updatedOrders.filter(order =>
        order.statut.toLowerCase().includes(statut.toLowerCase())
      );
    }

    if (client) {
      updatedOrders = updatedOrders.filter(order =>
        order.client.toLowerCase().includes(client.toLowerCase())
      );
    }

    if (quantite) {
      updatedOrders = updatedOrders.filter(order => 
        order.montant === parseFloat(quantite)
      );
    }

    setFilteredOrders(updatedOrders);
  };

  useEffect(() => {
    applyFilters(); // Applique les filtres automatiquement à chaque changement d'état
  }, [categorie, statut, client, quantite]);

  return (
    <div>
      <h1 className="title">Commandes Clients</h1>

      <div className="filterContainer">
        <h3>Filtres</h3>
        <input
          type="text"
          placeholder="Categorie..."
          value={categorie}
          onChange={(e) => setCategorie(e.target.value)}
        />
        <input
          type="text"
          placeholder="Statut..."
          value={statut}
          onChange={(e) => setStatut(e.target.value)}
        />
        <input
          type="text"
          placeholder="Clients..."
          value={client}
          onChange={(e) => setClient(e.target.value)}
        />
        <input
          type="text"
          placeholder="Montant"
          value={quantite}
          onChange={(e) => setQuantite(e.target.value)}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Description</th>
            <th>Categorie</th>
            <th>Montant</th>
            <th>Client</th>
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
              <td>{order.client}</td>
              <td>{order.statut}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerOrders;
