import { useState, useEffect } from 'react';
import { Tax } from '../types/tax.types';
import { fetchTaxes, updateTax } from '../api/taxes.api';

export const useTaxes = () => {
  const [taxes, setTaxes] = useState<Tax[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTaxes = async () => {
    try {
      setLoading(true);
      const data = await fetchTaxes();
      setTaxes(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load taxes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTaxes();
  }, []);

  const updateTaxData = async (id: string, updatedData: Tax) => {
    try {
      const updated = await updateTax(id, updatedData);
      setTaxes((prev) =>
        prev.map((tax) => (tax.id === id ? updated : tax))
      );
      return updated;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update tax');
    }
  };

  return {
    taxes,
    loading,
    error,
    updateTaxData,
    refreshTaxes: loadTaxes,
  };
};
