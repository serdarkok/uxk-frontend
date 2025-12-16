import { Button } from "@/components/ui/Button";
import { Download } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import type { IShip } from "@/types/ship";

export function Summary({ selectedRow }: { selectedRow: IShip }) {
  const price = selectedRow?.item?.price || 0;
  const quantity = selectedRow?.quantity || 0;
  const markup = selectedRow?.item?.markup / 100 || 0;
  const unitPrice = price * (1 + markup);
  const totalPrice = unitPrice * quantity;

  return (
    <div className="flex flex-col gap-8 bg-white dark:bg-gray-800 mx-3 p-6 rounded-md">
    {/* Row 1: Spec, Vendor, Phase */}
    <div className="grid grid-cols-3 gap-6">
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-500 dark:text-gray-400">Spec #</label>
        <p className="text-sm font-medium">{selectedRow?.item?.spec || 'N/A'}</p>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-500 dark:text-gray-400">Vendor</label>
        <p className="text-sm font-medium">{selectedRow?.vendor?.name || 'N/A'}</p>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-500 dark:text-gray-400">Phase</label>
        <div className="text-sm font-bold">{selectedRow?.phase || 1}</div>
      </div>
    </div>

    {/* Row 2: Ship to, Ship From, Notes */}
    <div className="grid grid-cols-3 gap-6">
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-500 dark:text-gray-400">Ship to</label>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold">{selectedRow?.shipToTitle || 'N/A'}</p>
          { selectedRow?.shipToAddress && 
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {selectedRow?.shipToAddress}
            </p>
          }
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-500 dark:text-gray-400">Ship From</label>
        <p className="text-sm font-medium">{selectedRow?.shipFrom || selectedRow?.vendor?.name || 'N/A'}</p>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-500 dark:text-gray-400">Notes for this item</label>
        <p className="text-sm font-medium">{selectedRow?.notes || 'No notes'}</p>
      </div>
    </div>

    {/* Row 3: Location, Category, Upload */}
    <div className="grid grid-cols-3 gap-6">
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-500 dark:text-gray-400">Location</label>
        <p className="text-sm font-medium">{selectedRow?.location?.name || 'N/A'}</p>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-500 dark:text-gray-400">Category</label>
        <p className="text-sm font-medium">{selectedRow?.category?.name || 'N/A'}</p>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-500 dark:text-gray-400">Upload</label>
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium truncate">{selectedRow?.item?.spec} 2ND FLO...</p>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>

    {/* Table */}
    <div className="border rounded-md overflow-hidden">
      <table className="w-full table-bordered" border={1}>
        <thead className="bg-gray-50 dark:bg-gray-700 text-stone-500 dark:text-stone-400">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium">Description</th>
            <th className="px-4 py-3 text-left">Price</th>
            <th className="px-4 py-3 text-left">Markup</th>
            <th className="px-4 py-3 text-left">Unit Price</th>
            <th className="px-4 py-3 text-left">Qty</th>
            <th className="px-4 py-3 text-left">Unit</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t dark:border-gray-700">
            <td className="px-4 py-3 text-sm">
              { selectedRow?.item?.description || 'N/A' }
            </td>
            <td className="px-4 py-3">{formatCurrency(price)}</td>
            <td className="px-4 py-3">{(markup * 100).toFixed(0)}%</td>
            <td className="px-4 py-3">{formatCurrency(unitPrice)}</td>
            <td className="px-4 py-3">{quantity}</td>
            <td className="px-4 py-3">each</td>
          </tr>
        </tbody>
      </table>
    </div>

    {/* Total Price */}
    <div className="flex justify-end items-center gap-10">
      <span className="text-md font-bold">TOTAL PRICE</span>
      <span className="text-md font-bold">{formatCurrency(totalPrice)}</span>
    </div>
  </div>
  );
}