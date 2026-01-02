// Utility: Title Case a string (handles single/multi-word)
function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase());
}
import { ColumnDef } from '@tanstack/react-table';
import { Tax } from '../../types/tax.types';
import { formatDate } from '../../utils/formatDate';
import { Edit2, Filter } from 'lucide-react';
import { useState } from 'react';

// Minimal, self-contained filter button UI to align with Figma.
// Does not alter table logic or apply any filtering; purely visual.
const FilterButton = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const options = ["India", "US", "UK"];
  const handleChange = (option: string) => {
    setSelected((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
    // TODO: Implement table filtering logic here if needed
  };
  return (
    <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
      <button
        className="column-filter-button"
        aria-label="Filter"
        onClick={() => setOpen((v) => !v)}
        style={{
          width: '24px',
          height: '24px',
          borderRadius: '4px',
          background: 'transparent',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.15s ease',
          padding: 0,
        }}
      >
        <Filter size={14} color="#6366F1" style={{ opacity: 1 }} />
      </button>
      {open && (
        <div
          className="column-filter-popover"
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            right: 0,
            background: '#FFFFFF',
            borderRadius: '8px',
            boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.08)',
            padding: '8px',
            zIndex: 20,
            minWidth: '140px',
          }}
        >
          {options.map((option, idx) => (
            <label
              key={option}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: idx < options.length - 1 ? '6px' : 0,
                fontSize: '14px',
                color: '#111827',
              }}
            >
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => handleChange(option)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      )}
    </span>
  );
};

export const createColumns = (
  onEditClick: (tax: Tax) => void
): ColumnDef<Tax>[] => [
  {
    accessorKey: 'name',
    header: <span style={{ fontSize: '12px', fontWeight: 500, letterSpacing: '0.04em', color: '#6B7280' }}>Entity</span>,
    cell: ({ row }) => (
      <span style={{ color: '#5B6CFF', fontWeight: 500, fontSize: '14px' }}>
        {row.original.name}
      </span>
    ),
  },
  {
    accessorKey: 'gender',
    header: <span style={{ fontSize: '12px', fontWeight: 500, letterSpacing: '0.04em', color: '#6B7280' }}>Gender</span>,
    cell: ({ row }) => {
      const gender = row.original.gender;
      const isMale = gender.toLowerCase() === 'male';
      return (
        <span
          style={{
            display: 'inline-block',
            padding: '4px 12px',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: 500,
            backgroundColor: isMale ? '#FDE2E4' : '#DBEAFE',
            color: isMale ? '#DC2626' : '#2563EB',
          }}
        >
          {toTitleCase(gender)}
        </span>
      );
    },
  },
  {
    accessorKey: 'requestDate',
    header: <span style={{ fontSize: '12px', fontWeight: 500, letterSpacing: '0.04em', color: '#6B7280' }}>Request Date</span>,
    cell: ({ row }) => <span style={{ fontSize: '14px', color: '#111827' }}>{formatDate(row.original.requestDate)}</span>,
  },
  {
    accessorKey: 'country',
    header: () => (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 500, letterSpacing: '0.04em', color: '#6B7280' }}>
        Country
        <FilterButton />
      </span>
    ),
    cell: ({ row }) => (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <span style={{ fontSize: '14px', color: '#111827' }}>{toTitleCase(row.original.country)}</span>
        <button
          onClick={() => onEditClick(row.original)}
          className="edit-square-button"
          aria-label="Edit"
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '6px',
            background: 'transparent',
            border: '1px solid transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxSizing: 'border-box',
            cursor: 'pointer',
            padding: 0,
            transition: 'all 0.15s ease',
          }}
          onMouseOver={e => e.currentTarget.style.background = '#F9FAFB'}
          onMouseOut={e => e.currentTarget.style.background = 'transparent'}
        >
          <Edit2 size={16} strokeWidth={1.5} color="#9CA3AF" style={{ opacity: 0.45 }} />
        </button>
      </div>
    ),
  },
];
