import { useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import { Tax } from '../../types/tax.types';
import { createColumns } from './columns';
import { tableStyles } from './Table.styles';

interface CustomerTableProps {
  data: Tax[];
  onEditClick: (tax: Tax) => void;
}

export const CustomerTable = ({ data, onEditClick }: CustomerTableProps) => {
  const columns = useMemo(() => createColumns(onEditClick), [onEditClick]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div style={tableStyles.container}>
      <table style={tableStyles.table}>
        <thead style={tableStyles.thead}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} style={tableStyles.th}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody style={tableStyles.tbody}>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} style={tableStyles.tr}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} style={tableStyles.td}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
