import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel
} from "@tanstack/react-table"
import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table"
import { DataTablePagination } from "./Pagination";
import { Drawer } from "./Drawer";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSelectedShip, selectIsDrawerOpen, setDrawerOpen, setSelectedRows } from "@/store/slices/selectedShipSlice";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const dispatch = useAppDispatch();
  const isDrawerOpen = useAppSelector(selectIsDrawerOpen);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    meta: {
      openSheet: (rowData: TData) => {
        dispatch(setSelectedShip(rowData as any));
      }
    }
  });

  useEffect(() => {
    const selectedRowsData = table.getFilteredSelectedRowModel().rows.map(row => row.original);
    dispatch(setSelectedRows(selectedRowsData as any));
  }, [rowSelection, dispatch, table]);

  // UX Sorunu oluşturur
  // useEffect(() => {
  //   if(!isDrawerOpen) {
  //     dispatch(clearSelectedRows());
  //     setRowSelection({});
  //   }
  // }, [isDrawerOpen]);

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="overflow-hidden rounded-md border w-full">
        <Table>
          <TableHeader className="dark:bg-stone-900 bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-left">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
      <Drawer 
        open={isDrawerOpen} 
        setOpen={(open) => dispatch(setDrawerOpen(open))}
        isImmediate={true}
      />
    </div>
  )
}