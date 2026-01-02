import { useState } from 'react';
import { CustomerTable } from '../components/Table/CustomerTable';
import { EditCustomerModal } from '../components/Modal/EditCustomerModal';
import { useTaxes } from '../hooks/useTaxes';
import { useCountries } from '../hooks/useCountries';
import { Tax } from '../types/tax.types';

export const Home = () => {
  const { taxes, loading: taxesLoading, updateTaxData } = useTaxes();
  const { countries, loading: countriesLoading } = useCountries();
  const [selectedCustomer, setSelectedCustomer] = useState<Tax | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = (tax: Tax) => {
    setSelectedCustomer(tax);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCustomer(null);
  };

  const handleSave = async (updatedCustomer: Tax) => {
    await updateTaxData(updatedCustomer.id, updatedCustomer);
  };

  if (taxesLoading || countriesLoading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(68, 68, 68, 1)', // Updated background per request
        }}
      >
        <div style={{ fontSize: '16px', color: '#E5E7EB' }}>Loading...</div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'rgba(68, 68, 68, 1)', // Updated background per request
        padding: '40px 20px',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <CustomerTable data={taxes} onEditClick={handleEditClick} />
      </div>

      {selectedCustomer && (
        <EditCustomerModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          customer={selectedCustomer}
          countries={countries}
          onSave={handleSave}
        />
      )}
    </div>
  );
};
