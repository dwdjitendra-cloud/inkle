export const modalStyles = {
  overlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(68, 68, 68, 1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px', // Spec: modal padding 24px on all sides
    width: '90%',
    maxWidth: '500px',
    boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.08)', // Spec: softer modal shadow
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  title: {
    fontSize: '20px',
    fontWeight: 500, 
    letterSpacing: '-0.01em', 
    color: '#111827',
    margin: 0,
  },
  closeButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    color: '#9CA3AF', 
    opacity: 0.7, 
    display: 'flex',
    alignItems: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px', 
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
  },
  label: {
    fontSize: '13px', // Spec: labels font-size
    fontWeight: 500,
    color: '#6B7280', // Spec: labels color
  },
  required: {
    color: '#EF4444',
  },
  input: {
    padding: '8px 12px', // Spec: input padding
    border: '1px solid #E5E7EB', // Spec: input border color (inactive) #E5E7EB
    borderRadius: '6px',
    fontSize: '14px',
    color: '#111827',
    outline: 'none',
    height: '40px', 
    boxSizing: 'border-box' as const, // Keep height inclusive of padding/border
  },
  dropdown: {
    position: 'relative' as const,
  },
  dropdownButton: {
    width: '100%',
    padding: '8px 12px', // Spec: input-like padding
    // Spec: avoid mixing border shorthand with borderColor overrides (prevents React rerender warning)
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#E5E7EB', // Match input inactive border color
    borderRadius: '6px',
    fontSize: '14px',
    color: '#111827',
    backgroundColor: 'white',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'left' as const,
  },
  dropdownButtonOpen: {
    borderColor: '#6366F1',
  },
  dropdownList: {
    position: 'absolute' as const,
    top: 'calc(100% + 4px)',
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF', // Spec: dropdown background pure white
    border: '1px solid #E5E7EB',
    borderRadius: '8px', // Spec: dropdown radius 8px
    boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.08)', // Spec: dropdown shadow
    maxHeight: '200px',
    overflowY: 'auto' as const,
    padding: '4px 0', // Spec: container padding
    zIndex: 10,
  },
  dropdownItem: {
    padding: '0 12px', // Spec: horizontal padding 12px
    cursor: 'pointer',
    fontSize: '14px',
    display: 'flex', // Spec: flex layout
    alignItems: 'center',
    gap: '10px', // Spec: gap between icon and text
    height: '40px', // Spec: dropdown item height 40px
    boxSizing: 'border-box' as const, // Height includes padding
    borderBottom: 'none', // Spec: no borders on items
  },
  dropdownItemContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flex: 1,
  },
  dropdownItemIcon: {
    // Spec: square container for edit icon inside dropdown (exists in DOM)
    width: '28px',
    height: '28px',
    borderRadius: '6px',
    backgroundColor: '#F9FAFB',
    border: '1px solid #E5E7EB',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    padding: 0,
    color: '#6366F1', // Spec: icon color (primary purple)
    transition: 'all 0.15s ease', // Spec: smooth transition
  },
  radio: {
    display: 'none', // Spec: do not use radio buttons
  },
  radioSelected: {
    borderColor: '#6366F1', // Not used; kept for compatibility
  },
  radioDot: {
    display: 'none', // Spec: remove radio button indicators entirely
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '8px',
  },
  cancelButton: {
    padding: '10px 20px',
    border: '1px solid #D1D5DB',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: 500,
    color: '#374151',
    backgroundColor: 'white',
    cursor: 'pointer',
  },
    saveButton: {
    padding: '10px 16px',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: 500,
    color: 'white',
    backgroundColor: '#4F46E5',
    cursor: 'pointer',
  },
  saveButtonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
};
