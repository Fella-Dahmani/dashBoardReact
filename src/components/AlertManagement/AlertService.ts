/*

// AlertService.ts
import { Alert } from './Alert';

const API_URL = 'https://stockvisiobackend.onrender.com/api/alertes'; // Verifier l'URL avec Bruno

export const fetchAlertes = async (): Promise<Alert[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des alertes');
  }
  return response.json();
};

export const updateAlerte = async (id: number, updatedData: Partial<Alert>): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    throw new Error('Erreur lors de la mise à jour de l\'alerte');
  }
};

export const applyFilter = async (criteria: any): Promise<Alert[]> => {
  const response = await fetch(`${API_URL}/filter`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(criteria),
  });

  if (!response.ok) {
    throw new Error('Erreur lors de l\'application du filtre');
  }
  return response.json();
};
*/

import axios from "axios";
import { Alert } from './Alert';

// Fetch all alerts
export const fetchAlertes = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/alertes");
    return response.data as Alert[];
  } catch (error) {
    console.error("Erreur lors de la récupération des alertes :", error);
    throw error;
  }
};

// Fetch alerts by status
export const fetchAlertesByStatut = async (statut: string = "") => {
  try {
    const response = await axios.get("http://localhost:8080/api/alertes/statut", {
      params: { statut },
    });
    return response.data as Alert[];
  } catch (error) {
    console.error("Erreur lors de la récupération des alertes par statut :", error);
    throw error;
  }
};

// Fetch alerts by provider
export const fetchAlertesByFournisseur = async (fournisseur: string = "") => {
  try {
    const response = await axios.get("http://localhost:8080/api/alertes/fournisseur", {
      params: { fournisseur },
    });
    return response.data as Alert[];
  } catch (error) {
    console.error("Erreur lors de la récupération des alertes par fournisseur :", error);
    throw error;
  }
};

// Fetch alerts by name
export const fetchAlertesByNom = async (nomAlerte: string = "") => {
  try {
    const response = await axios.get("http://localhost:8080/api/alertes/nom", {
      params: { nomAlerte },
    });
    return response.data as Alert[];
  } catch (error) {
    console.error("Erreur lors de la récupération des alertes par nom :", error);
    throw error;
  }
};

// Fetch alerts by creation date
export const fetchAlertesByDateCreee = async (dateCreee: string = "") => {
  try {
    const response = await axios.get("http://localhost:8080/api/alertes/dateCreee", {
      params: { dateCreee },
    });
    return response.data as Alert[];
  } catch (error) {
    console.error("Erreur lors de la récupération des alertes par date de création :", error);
    throw error;
  }
};

// Fetch alerts by resolution date
export const fetchAlertesByDateReglee = async (dateReglee: string = "") => {
  try {
    const response = await axios.get("http://localhost:8080/api/alertes/dateReglee", {
      params: { dateReglee },
    });
    return response.data as Alert[];
  } catch (error) {
    console.error("Erreur lors de la récupération des alertes par date réglée :", error);
    throw error;
  }
};

// Apply filter to alerts
export const applyFilter = async (filterCriteria: any) => {
  try {
    const response = await axios.post("http://localhost:8080/api/alertes/filter", {filterCriteria});
    return response.data as Alert[];
  } catch (error) {
    console.error("Erreur lors de l'application du filtre :", error);
    throw error;
  }
};

// Update alert
export const updateAlerte = async (id: number, updateData: Partial<Alert>) => {
  try {
    const response = await axios.put(`http://localhost:8080/api/alertes/${id}`, updateData);
    return response.data as Alert;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'alerte :", error);
    throw error;
  }
};

