import { Tax } from '../types/tax.types';

const API_BASE_URL = 'https://685013d7e7c42cfd17974a33.mockapi.io';

export const fetchTaxes = async (): Promise<Tax[]> => {
  const response = await fetch(`${API_BASE_URL}/taxes`);
  if (!response.ok) {
    throw new Error('Failed to fetch taxes');
  }
  return response.json();
};

export const updateTax = async (id: string, data: Tax): Promise<Tax> => {
  const response = await fetch(`${API_BASE_URL}/taxes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to update tax');
  }
  return response.json();
};
