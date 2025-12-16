import { DateInput } from "./DateInput";
import type { IShip } from "@/types/ship";

interface ProductionProps {
  selectedRow: IShip;
  setSelectedRow: (data: Partial<IShip>) => void;
}

export function Production({ selectedRow, setSelectedRow }: ProductionProps) {
  const shopsSend = selectedRow.shopsSend ? new Date(selectedRow.shopsSend) : undefined;
  const shopsApproved = selectedRow.shopsApproved ? new Date(selectedRow.shopsApproved) : undefined;
  const shopsDelivered = selectedRow.shopsDelivered ? new Date(selectedRow.shopsDelivered) : undefined;

  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="flex flex-col gap-2">
        <DateInput 
          label="CFA/Shops Send" 
          value={shopsSend} 
          setValue={(date) => setSelectedRow({ shopsSend: date?.toISOString() || null })} 
        />
      </div>
      <div className="flex flex-col gap-2">
        <DateInput 
          label="CFA/Shops Approved" 
          value={shopsApproved} 
          setValue={(date) => setSelectedRow({ shopsApproved: date?.toISOString() || null })} 
        />
      </div>
      <div className="flex flex-col gap-2">
        <DateInput 
          label="CFA/Shops Delivered" 
          value={shopsDelivered} 
          setValue={(date) => setSelectedRow({ shopsDelivered: date?.toISOString() || null })} 
        />
      </div>
    </div>
  )
}