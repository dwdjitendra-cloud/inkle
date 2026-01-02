import { useState, useEffect } from 'react';
import { Country } from '../types/country.types';
import { fetchCountries } from '../api/countries.api';

export const useCountries = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCountries = async () => {
      try {
        setLoading(true);
        const data = await fetchCountries();
        setCountries(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load countries');
      } finally {
        setLoading(false);
      }
    };

    loadCountries();
  }, []);

  return {
    countries,
    loading,
    error,
  };
};
