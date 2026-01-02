import { ColumnDef } from '@tanstack/react-table';
import { Tax } from '../../types/tax.types';
import { formatDate } from '../../utils/formatDate';
import { Edit2, Filter } from 'lucide-react';
import { useState } from 'react';

// Minimal, self-contained filter button UI to align with Figma.
// Does not alter table logic or apply any filtering; purely visual.
const FilterButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
      {/* Spec: gap between text and icon is handled by header container; button itself is 24x24 */}
      <button
        className="column-filter-button"
        aria-label="Filter"
        onClick={() => setOpen((v) => !v)}
        // Spec: button container sizing and centering
        style={{
          height: '24px',
          borderRadius: '4px', // Spec: radius 4px
          background: 'transparent', // Spec: default transparent background
          border: 'none', // Spec: no border
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.15s ease', // Spec: smooth transition
          padding: 0,
        }}
      >
        <Filter size={14} /> {/* Spec: outline funnel icon 14x14 */}
      </button>
      {open && (
        <div
          className="column-filter-popover"
          // Spec: popover positioned below the icon
          style={{
            top: 'calc(100% + 6px)',
            right: 0,
            background: '#FFFFFF', // Spec: popover background
            borderRadius: '8px', // Spec: radius 8px
            boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.08)', // Spec: shadow
            padding: '8px', // Spec: padding 8px
            zIndex: 20,
            minWidth: '140px',
          }}
        >
          {/* Spec: vertical list of checkboxes, 8px spacing, labels 14px, color #111827 */}
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '14px', color: '#111827' }}>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '14px', color: '#111827' }}>
            <input type="checkbox" /> <span>US</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 0, fontSize: '14px', color: '#111827' }}>
            <input type="checkbox" /> <span>UK</span>
          </label>
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
    header: 'Entity',
    cell: ({ row }) => (
      <span style={{ color: '#5B6CFF', fontWeight: 500 }}>
        {row.original.name}
      </span>
    ),
  },
  {
    accessorKey: 'gender',
    header: 'Gender',
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
          {gender}
        </span>
      );
    },
  },
  {
    accessorKey: 'requestDate',
    header: 'Request Date',
    cell: ({ row }) => <span>{formatDate(row.original.requestDate)}</span>,
  },
  {
    accessorKey: 'country',
    header: () => (
      // Spec: place filter button inline with "Country"; center aligned; 6px gap
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
        Country <FilterButton />
      </span>
    ),
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => (
      <button
        onClick={() => onEditClick(row.original)}
        style={{
          width: '32px', // Button size 32x32
          height: '32px',
          borderRadius: '6px', // Rounded corners
          background: 'transparent', // Default transparent background
          border: '1px solid transparent', // Invisible border by default
          boxSizing: 'border-box',
          cursor: 'pointer',
          padding: 0,
          display: 'inline-flex', // Keep inline flow
          alignItems: 'center',
          justifyContent: 'center', // Center icon perfectly
          transition: 'all 0.15s ease', // Smooth transition
        }}
        aria-label="Edit"
        className="edit-square-button"
      >
        <Edit2 size={16} strokeWidth={1.5} />
      </button>
    ),
  },
    {
      accessorKey: 'country',
      header: () => (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          Country <FilterButton />
        </span>
      ),
    },
];
