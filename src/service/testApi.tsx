import React, { useEffect, useState } from 'react';
import { fetchProduits } from './InventaireService';
import { Produit } from '../type/Produit';
 
const ProduitsComponent: React.FC = () => {
  const [produits, setProduits] = useState<Produit[]>([]);
 
  useEffect(() => {
    const chargerProduits = async () => {
      try {
        const data = await fetchProduits();
        setProduits(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error.message);
      }
    };
 
    chargerProduits();
  }, []);
 
  return (
<div>
<h1>Liste des produits</h1>
<ul>
        {produits.map(produit => (
<li key={produit.id}>{produit.nom}</li>
        ))}
</ul>
</div>
  );
};
 
export default ProduitsComponent;