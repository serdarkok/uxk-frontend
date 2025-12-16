import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import type { ColumnDef } from "@tanstack/react-table";
import { formatCurrency } from "@/lib/utils";
import type { IShip } from "@/types/ship";

export const columns: ColumnDef<IShip>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: 'Item#',
    accessorKey: 'itemId',
  },
  {
    header: 'Spec#',
    accessorKey: 'item.spec',
  },
  {
    header: 'Item Name',
    accessorKey: 'item.name',
    cell: ({ row, table }) => (
      <span 
        className="text-left cursor-pointer text-red-700 hover:underline"
        onClick={() => {
          // @ts-ignore - Custom meta method
          table.options.meta?.openSheet(row.original);
        }}
      >
        {row.original.item.name}
      </span>
    ),
  },
  {
    header: 'Vendor',
    accessorKey: 'vendor.name',
  },
  {
    header: 'Ship To',
    accessorKey: 'shipToTitle',
  },
  {
    header: 'Qty',
    accessorKey: 'quantity',
  },
  {
    header: 'Phase',
    accessorKey: 'phase',
    cell: ({ row }) => (
      <div className="text-center w-10 h-10 flex items-center justify-center italic font-medium bg-gray-200 dark:bg-stone-900 rounded-md">{ row.original.phase < 10 && '0' }{row.original.phase}</div>
    ),
  },
  {
    header: 'Price',
    accessorKey: 'item.price',
    cell: ({ row }) => (
      <span className="text-left">{ formatCurrency(row.original.item.price) }</span>
    ),
  },
  {
    header: 'Ships Note',
    accessorKey: 'notes',
    cell: ({ row }) => (
      <span 
        className="text-left line-clamp-1 max-w-[180px] block text-ellipsis overflow-hidden" 
        title={row.original.notes || ''}
      >
        {row.original.notes || '-'}
      </span>
    ),
  },
  {
    header: 'Action',
    accessorKey: 'status',
    cell: () => (
      <Button variant='ghost' size='sm'>Edit</Button>
    ),
  }
];