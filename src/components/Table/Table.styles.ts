export const tableStyles = {
  container: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
  },
  thead: {
    backgroundColor: '#F9FAFB',
    borderBottom: '1px solid #E5E7EB',
  },
  th: {
    padding: '12px 16px',
    textAlign: 'left' as const,
    fontSize: '12px', // Spec: table header font-size 12px
    fontWeight: 500, // Spec: table header font-weight 500
    color: '#6B7280',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.02em', // Spec: reduce header letter-spacing to 0.02em
  },
  tbody: {},
  tr: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.06)', // Spec: reduce row divider border color
  },
  td: {
    padding: '14px 16px', // Spec: reduce row height by ~10% (less vertical padding)
    fontSize: '14px',
    color: '#111827',
  },
};
