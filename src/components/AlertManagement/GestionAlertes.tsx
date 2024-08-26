
// GestionAlertes.tsx
import React, { useEffect, useState } from 'react';
import { Alert } from './Alert';
import { fetchAlertes, updateAlerte, applyFilter } from './AlertService';
import './GestionAlertes.css';

const GestionAlertes: React.FC = () => {
  const [alertes, setAlertes] = useState<Alert[]>([]);
  const [filterCriteria, setFilterCriteria] = useState({
    nomAlerte: '',
    fournisseur: '',
    statutAlerte: '',
    dateCreee: '',
    dateReglee: '',
  });

  useEffect(() => {
    const getAlertes = async () => {
      try {
        const data = await fetchAlertes();
        setAlertes(data);
      } catch (error) {
        console.error('Erreur lors du chargement des alertes:', error);
      }
    };

    getAlertes();
  }, []);

  const appliquerFiltre = async () => {
    try {
      const filteredAlertes = await applyFilter(filterCriteria);
      setAlertes(filteredAlertes);
    } catch (error) {
      console.error('Erreur lors de l\'application du filtre:', error);
    }
  };

  return (
    <div className="gestion-alertes">
      <h1>Gestion des Alertes</h1>
      <div className="filters">
        <label>Filtre:</label>
        <input
          type="text"
          placeholder="Nom Alerte"
          value={filterCriteria.nomAlerte}
          onChange={(e) =>
            setFilterCriteria({ ...filterCriteria, nomAlerte: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Statut Alerte"
          value={filterCriteria.statutAlerte}
          onChange={(e) =>
            setFilterCriteria({ ...filterCriteria, statutAlerte: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Fournisseur"
          value={filterCriteria.fournisseur}
          onChange={(e) =>
            setFilterCriteria({ ...filterCriteria, fournisseur: e.target.value })
          }
        />
        <label>Date Gérée:</label>
        <input
          type="date"
          placeholder="Date Créée"
          value={filterCriteria.dateCreee}
          onChange={(e) =>
            setFilterCriteria({ ...filterCriteria, dateCreee: e.target.value })
          }
        />
        <label>Date Réglée:</label>
        <input
          type="date"
          placeholder="Date Réglée"
          value={filterCriteria.dateReglee}
          onChange={(e) =>
            setFilterCriteria({ ...filterCriteria, dateReglee: e.target.value })
          }
        />
        <button onClick={appliquerFiltre}>Appliquer Filtre</button>
      </div>
      <table className="alertes-table">
        <thead>
          <tr>
            <th>Alerte Géré</th>
            <th>Nom Alerte</th>
            <th>Fournisseur</th>
            <th>Date Créée</th>
            <th>Date Réglée</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Oui</td>
            <td>Alerte Stock Bas</td>
            <td>Fournisseur X</td>
            <td>2024-08-10</td>
            <td>2024-08-12</td>
          </tr>
          <tr>
            <td>Non</td>
            <td>Alerte Erreur Base de Données</td>
            <td>Fournisseur Y</td>
            <td>2024-08-15</td>
            <td>Non réglée</td>
          </tr>
          <tr>
            <td>Oui</td>
            <td>Alerte Problème Réseau</td>
            <td>Fournisseur Z</td>
            <td>2024-08-18</td>
            <td>2024-08-19</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default GestionAlertes;