import { useState, useEffect } from 'react';
import { X, ChevronDown, Edit2 } from 'lucide-react';
import { Tax } from '../../types/tax.types';
import { Country } from '../../types/country.types';
import { modalStyles } from './Modal.styles';

interface EditCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: Tax;
  countries: Country[];
  onSave: (updatedCustomer: Tax) => Promise<void>;
}

export const EditCustomerModal = ({
  isOpen,
  onClose,
  customer,
  countries,
  onSave,
}: EditCustomerModalProps) => {
  const [name, setName] = useState(customer.name);
  const [country, setCountry] = useState(customer.country);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setName(customer.name);
    setCountry(customer.country);
  }, [customer]);

  if (!isOpen) return null;

  const handleSave = async () => {
    if (!name.trim()) return;

    setIsSaving(true);
    try {
      await onSave({
        ...customer,
        name: name.trim(),
        country,
      });
      onClose();
    } catch (error) {
      console.error('Error saving customer:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div style={modalStyles.overlay} onClick={handleOverlayClick}>
      <div style={modalStyles.modal}>
        <div style={modalStyles.header}>
          <h2 style={modalStyles.title}>Edit Customer</h2>
          <button
            style={modalStyles.closeButton}
            onClick={onClose}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div style={modalStyles.form}>
          <div style={modalStyles.formGroup}>
            <label style={modalStyles.label}>
              Name <span style={modalStyles.required}>*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={modalStyles.input}
              placeholder="Enter customer name"
            />
          </div>

          <div style={modalStyles.formGroup}>
            <label style={modalStyles.label}>Country</label>
            <div style={modalStyles.dropdown}>
              <button
                type="button"
                style={{
                  ...modalStyles.dropdownButton,
                  ...(isDropdownOpen ? modalStyles.dropdownButtonOpen : {}),
                }}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span>{country}</span>
                <ChevronDown size={16} />
              </button>

              {isDropdownOpen && (
                <div
                  style={modalStyles.dropdownList}
                  className="country-dropdown-list" // Styling hook for hover/selected states
                >
                  {countries.map((c) => (
                    <div
                      key={c.id}
                      style={modalStyles.dropdownItem}
                      className="country-dropdown-item" // Styling hook for hover/selected states
                      data-selected={c.name === country} // Spec: selected background
                      onClick={() => {
                        setCountry(c.name);
                        setIsDropdownOpen(false);
                      }}
                    >
                      <div style={modalStyles.dropdownItemContent}>
                        <div
                          style={{
                            ...modalStyles.radio,
                            ...(c.name === country
                              ? modalStyles.radioSelected
                              : {}),
                          }}
                        >
                          {c.name === country && (
                            <div style={modalStyles.radioDot} />
                          )}
                        </div>
                        <span>{c.name}</span>
                      </div>
                      <button
                        type="button"
                        aria-label="Edit country"
                        className="country-dropdown-edit"
                        style={modalStyles.dropdownItemIcon}
                      >
                        <Edit2 size={14} strokeWidth={1.5} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div style={modalStyles.actions}>
            <button
              style={modalStyles.cancelButton}
              onClick={onClose}
              disabled={isSaving}
            >
              Cancel
            </button>
            <button
              style={{
                ...modalStyles.saveButton,
                ...(isSaving || !name.trim()
                  ? modalStyles.saveButtonDisabled
                  : {}),
              }}
              onClick={handleSave}
              disabled={isSaving || !name.trim()}
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
