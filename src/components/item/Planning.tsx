import { DateInput } from "./DateInput";
import type { IShip } from "@/types/ship";
import { utcStringToLocalDate, parseInputDateToUTC, daysDiff } from "@/lib/date";

interface PlanningProps {
  selectedRow: Pick<IShip, 'poApproval' | 'hotelNeedBy' | 'exceptedDelivery'>;
  setSelectedRow: (data: Partial<IShip>) => void;
}

export function Planning({ selectedRow, setSelectedRow }: PlanningProps) {
  // Convert UTC strings from database to Date objects for DatePicker
  const poApproval = utcStringToLocalDate(selectedRow.poApproval);
  const hotelNeedBy = utcStringToLocalDate(selectedRow.hotelNeedBy);
  const expectedDelivery = utcStringToLocalDate(selectedRow.exceptedDelivery);

  const calculateDaysLate = () => {
    if (!selectedRow.hotelNeedBy || !selectedRow.exceptedDelivery) return null;
    const days = daysDiff(selectedRow.hotelNeedBy, selectedRow.exceptedDelivery);
    return days > 0 ? days : null;
  };

  const daysLate = calculateDaysLate();

  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="flex flex-col gap-2">
        <DateInput 
          label="PO Approval Date" 
          value={poApproval} 
          setValue={(date) => setSelectedRow({ poApproval: parseInputDateToUTC(date) })} 
        />
      </div>
      <div className="flex flex-col gap-2">
        <DateInput 
          label="Hotel Need by Date" 
          value={hotelNeedBy} 
          setValue={(date) => setSelectedRow({ hotelNeedBy: parseInputDateToUTC(date) })} 
        />
      </div>
      <div className="flex flex-col gap-2">
        <DateInput 
          label="Expected Delivery" 
          value={expectedDelivery} 
          setValue={(date) => setSelectedRow({ exceptedDelivery: parseInputDateToUTC(date) })} 
        />
        {daysLate && (
          <p className="text-sm text-red-600 dark:text-red-400">
            Late by {daysLate} days
          </p>
        )}
      </div>
    </div>
  )
}