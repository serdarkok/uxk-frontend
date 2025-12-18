import { DateInput } from "./DateInput";
import type { IShip } from "@/types/ship";
import { utcStringToLocalDate, parseInputDateToUTC } from "@/lib/date";

interface ProductionProps {
  selectedRow: Pick<IShip, 'shopsSend' | 'shopsApproved' | 'shopsDelivered'>;
  setSelectedRow: (data: Partial<IShip>) => void;
}

export function Production({ selectedRow, setSelectedRow }: ProductionProps) {
  const shopsSend = utcStringToLocalDate(selectedRow.shopsSend);
  const shopsApproved = utcStringToLocalDate(selectedRow.shopsApproved);
  const shopsDelivered = utcStringToLocalDate(selectedRow.shopsDelivered);

  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="flex flex-col gap-2">
        <DateInput 
          label="CFA/Shops Send" 
          value={shopsSend} 
          setValue={(date) => setSelectedRow({ shopsSend: parseInputDateToUTC(date) })} 
        />
      </div>
      <div className="flex flex-col gap-2">
        <DateInput 
          label="CFA/Shops Approved" 
          value={shopsApproved} 
          setValue={(date) => setSelectedRow({ shopsApproved: parseInputDateToUTC(date) })} 
        />
      </div>
      <div className="flex flex-col gap-2">
        <DateInput 
          label="CFA/Shops Delivered" 
          value={shopsDelivered} 
          setValue={(date) => setSelectedRow({ shopsDelivered: parseInputDateToUTC(date) })} 
        />
      </div>
    </div>
  )
}