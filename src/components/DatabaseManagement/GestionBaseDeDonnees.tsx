// GestionBaseDeDonnees.tsx
import React, { useState } from 'react';
import './GestionBaseDeDonnees.css';

const GestionBaseDeDonnees: React.FC = () => {
  const [connectionString, setConnectionString] = useState<string>('');

  const handleConnectionStringChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConnectionString(e.target.value);
  };

  const handleModifyClick = () => {
    console.log('Chaîne de connexion modifiée:', connectionString);
    // Vous pouvez ajouter ici la logique pour enregistrer la chaîne de connexion modifiée
  };

  return (
    <div className="gestion-base-de-donnees">
      <h1>Gestion de la Base de Données</h1>
      <div className="form-group">
        <label htmlFor="connection-string">Chaîne de connexion :</label>
        <input
          type="text"
          id="connection-string"
          value={connectionString}
          onChange={handleConnectionStringChange}
        />
      </div>
      <button onClick={handleModifyClick} className="modify-button">Modifier</button>
    </div>
  );
};

export default GestionBaseDeDonnees;
