
// HistoriqueAlertes.tsx

import React, { useEffect, useState } from 'react';
import { Alert } from './Alert';
import { fetchAlertes, updateAlerte, applyFilter } from './AlertService';
import './HistoriqueAlertes.css';

const HistoriqueAlertes: React.FC = () => {
  const [filterCriteria, setFilterCriteria] = useState({
    geree: false,
    fournisseur: '',
    dateCree: '',
    dateReglee: ''
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilterCriteria({
      ...filterCriteria,
      [e.target.name]: e.target.value
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterCriteria({
      ...filterCriteria,
      geree: e.target.checked
    });
  };

  const handleApplyFilter = () => {
    console.log('Applying filter with criteria:', filterCriteria);
    // Add filtering logic here
  };

  const alertes = [
    {
      id: 1,
      geree: true,
      nomAlerte: 'Problème de connexion',
      fournisseur: 'Fournisseur A',
      dateCree: '2024-08-01',
      dateReglee: '2024-08-05',
    },
    {
      id: 2,
      geree: false,
      nomAlerte: 'Stock bas',
      fournisseur: 'Fournisseur B',
      dateCree: '2024-08-03',
      dateReglee: '2024-08-06',
    },
    {
      id: 3,
      geree: true,
      nomAlerte: 'Problème de paiement',
      fournisseur: 'Fournisseur C',
      dateCree: '2024-08-02',
      dateReglee: '2024-08-07',
    }
  ];

  return (
    <div className="historique-alertes">
      <h1>Historique des Alertes</h1>
      <div className="filters">
        <label>Filtre:</label>
        <input
          type="checkbox"
          name="geree"
          checked={filterCriteria.geree}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="geree">Gérée</label>

        <select name="fournisseur" value={filterCriteria.fournisseur} onChange={handleFilterChange}>
          <option value="">Fournisseur</option>
          <option value="Fournisseur A">Fournisseur A</option>
          <option value="Fournisseur B">Fournisseur B</option>
          <option value="Fournisseur C">Fournisseur C</option>
        </select>

        <input
          type="date"
          name="dateCree"
          value={filterCriteria.dateCree}
          onChange={handleFilterChange}
          placeholder="Date créée"
        />

        <input
          type="date"
          name="dateReglee"
          value={filterCriteria.dateReglee}
          onChange={handleFilterChange}
          placeholder="Date réglée"
        />

        <button onClick={handleApplyFilter}>Appliquer Filtre</button>
      </div>
      <table className="alertes-table">
        <thead>
          <tr>
            <th>Géré</th>
            <th>Nom Alerte</th>
            <th>Fournisseur</th>
            <th>Date Créée</th>
            <th>Date Réglée</th>
          </tr>
        </thead>
        <tbody>
          {alertes.map((alerte) => (
            <tr key={alerte.id}>
              <td>
                <input type="checkbox" checked={alerte.geree} readOnly />
              </td>
              <td>{alerte.nomAlerte}</td>
              <td>{alerte.fournisseur}</td>
              <td>{alerte.dateCree}</td>
              <td>{alerte.dateReglee}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoriqueAlertes;