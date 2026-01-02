import { Country } from '../types/country.types';

const API_BASE_URL = 'https://685013d7e7c42cfd17974a33.mockapi.io';

export const fetchCountries = async (): Promise<Country[]> => {
  const response = await fetch(`${API_BASE_URL}/countries`);
  if (!response.ok) {
    throw new Error('Failed to fetch countries');
  }
  return response.json();
};
