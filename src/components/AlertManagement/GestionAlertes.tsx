// GestionAlertes.tsx
import React, { useEffect, useState } from 'react';
import { Alert } from './Alert';
import { fetchAlertes, updateAlerte, applyFilter } from './AlertService';
import './GestionAlertes.css';

const GestionAlertes: React.FC = () => {
  const [alertes, setAlertes] = useState<Alert[]>([]);
  const [filterCriteria, setFilterCriteria] = useState({});

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

  const handleAlerte = async (id: number) => {
    const alerte = alertes.find((alerte) => alerte.id === id);
    if (alerte) {
      try {
        await updateAlerte(id, { gere: !alerte.gere });
        setAlertes((prevAlertes) =>
          prevAlertes.map((a) =>
            a.id === id ? { ...a, gere: !a.gere } : a
          )
        );
      } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'alerte:', error);
      }
    }
  };

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
      <button onClick={appliquerFiltre}>Appliquer Filtre</button>
      <table className="alertes-table">
        <thead>
          <tr>
            <th>Alerte Géré</th>
            <th>Alerte</th>
            <th>Fournisseur</th>
            <th>Date Créée</th>
            <th>Date Réglée</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {alertes.map((alerte) => (
            <tr key={alerte.id}>
              <td>
                <input
                  type="checkbox"
                  checked={alerte.gere}
                  onChange={() => handleAlerte(alerte.id)}
                />
              </td>
              <td>{alerte.message}</td>
              <td>{alerte.fournisseur}</td>
              <td>{alerte.dateCreee}</td>
              <td>{alerte.dateReglee}</td>
              <td>
                <button onClick={() => handleAlerte(alerte.id)}>Gérer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GestionAlertes;
