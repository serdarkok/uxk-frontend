import { DateInput } from "./DateInput";
import { Textarea } from "../ui/Textarea";
import type { IShip } from "@/types/ship";
import { useEffect, useState } from "react";
import { utcStringToLocalDate, parseInputDateToUTC } from "@/lib/date";

interface ShippingProps {
  selectedRow: Pick<IShip, 'ordered' | 'shipped' | 'delivered' | 'notes'>;
  setSelectedRow: (data: Partial<IShip>) => void;
  isImmediate?: boolean;
}

export function Shipping({ selectedRow, setSelectedRow, isImmediate = true }: ShippingProps) {
  const ordered = utcStringToLocalDate(selectedRow.ordered);
  const shipped = utcStringToLocalDate(selectedRow.shipped);
  const delivered = utcStringToLocalDate(selectedRow.delivered);
  
  const [notes, setNotes] = useState(selectedRow.notes || '');

  useEffect(() => {
    setNotes(selectedRow.notes || '');
  }, [selectedRow.notes]);

  useEffect(() => {
    if (!isImmediate) return;
    
    const timer = setTimeout(() => {
      if (notes !== selectedRow.notes) {
        setSelectedRow({ notes });
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [notes, isImmediate]);

  const handleNotesChange = (value: string) => {
    setNotes(value);
    if (!isImmediate) {
      setSelectedRow({ notes: value });
    }
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-6">
        <div className="flex flex-col gap-2">
          <DateInput 
            label="Ordered Date" 
            value={ordered} 
            setValue={(date) => setSelectedRow({ ordered: parseInputDateToUTC(date) })} 
          />
        </div>
        <div className="flex flex-col gap-2">
          <DateInput 
            label="Shipped Date" 
            value={shipped} 
            setValue={(date) => setSelectedRow({ shipped: parseInputDateToUTC(date) })} 
          />
        </div>
        <div className="flex flex-col gap-2">
          <DateInput 
            label="Delivered Date" 
            value={delivered} 
            setValue={(date) => setSelectedRow({ delivered: parseInputDateToUTC(date) })} 
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Shipping Notes</label>
        <Textarea
          value={notes}
          onChange={(e) => handleNotesChange(e.target.value)}
          placeholder="Enter shipping notes..."
          className="min-h-24"
        />
      </div>
    </>
  )
}