// AlertService.ts
import { Alert } from './Alert';

const API_URL = 'https://api.example.com/alertes'; // Remplacer par l'URL de votre API

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
