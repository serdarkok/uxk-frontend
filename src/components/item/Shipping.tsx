import { DateInput } from "./DateInput";
import { Textarea } from "../ui/Textarea";
import type { IShip } from "@/types/ship";

interface ShippingProps {
  selectedRow: IShip;
  setSelectedRow: (data: Partial<IShip>) => void;
}

export function Shipping({ selectedRow, setSelectedRow }: ShippingProps) {
  const ordered = selectedRow.ordered ? new Date(selectedRow.ordered) : undefined;
  const shipped = selectedRow.shipped ? new Date(selectedRow.shipped) : undefined;
  const delivered = selectedRow.delivered ? new Date(selectedRow.delivered) : undefined;

  return (
    <>
      <div className="grid grid-cols-3 gap-6">
        <div className="flex flex-col gap-2">
          <DateInput 
            label="Ordered Date" 
            value={ordered} 
            setValue={(date) => setSelectedRow({ ordered: date?.toISOString() || null })} 
          />
        </div>
        <div className="flex flex-col gap-2">
          <DateInput 
            label="Shipped Date" 
            value={shipped} 
            setValue={(date) => setSelectedRow({ shipped: date?.toISOString() || null })} 
          />
        </div>
        <div className="flex flex-col gap-2">
          <DateInput 
            label="Delivered Date" 
            value={delivered} 
            setValue={(date) => setSelectedRow({ delivered: date?.toISOString() || null })} 
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Shipping Notes</label>
        <Textarea
          value={selectedRow.notes || ''}
          onChange={(e) => setSelectedRow({ notes: e.target.value })}
          placeholder="Enter shipping notes..."
          className="min-h-24"
        />
      </div>
    </>
  )
}