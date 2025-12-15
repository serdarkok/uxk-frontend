import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/checkbox";
import type { ColumnDef } from "@tanstack/react-table";
import { formatCurrency } from "@/lib/utils";

export type IShip = {
  id: number;
  itemId: number;
  shipToTitle: string;
  shipToAddress: string;
  shipFrom: string;
  vendorId: number;
  quantity: number;
  phase: number;
  notes: string;
  locationId: number;
  categoryId: number;
  poApproval: string | null;
  hotelNeedBy: string | null;
  exceptedDelivery: string | null;
  shopsSend: string | null;
  shopsApproved: string | null;
  shopsDelivered: string | null;
  ordered: string | null;
  shipped: string | null;
  delivered: string | null;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  item: {
    id: number;
    name: string;
    spec: string;
    price: number;
  };
  location: {
    id: number;
    name: string;
  };
  category: {
    id: number;
    name: string;
  };
  vendor: {
    id: number;
    name: string;
  };
}

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
      <div className="text-center w-10 h-10 flex items-center justify-center italic font-medium bg-gray-200 dark:bg-gray-700 rounded-md">{ row.original.phase < 10 && '0' }{row.original.phase}</div>
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
  },
  {
    header: 'Action',
    accessorKey: 'status',
    cell: () => (
      <Button variant='ghost' size='sm'>Edit</Button>
    ),
  }
];