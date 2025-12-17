import { DateInput } from "./DateInput";
import type { IShip } from "@/types/ship";

interface PlanningProps {
  selectedRow: Pick<IShip, 'poApproval' | 'hotelNeedBy' | 'exceptedDelivery'>;
  setSelectedRow: (data: Partial<IShip>) => void;
}

export function Planning({ selectedRow, setSelectedRow }: PlanningProps) {
  const poApproval = selectedRow.poApproval ? new Date(selectedRow.poApproval) : undefined;
  const hotelNeedBy = selectedRow.hotelNeedBy ? new Date(selectedRow.hotelNeedBy) : undefined;
  const expectedDelivery = selectedRow.exceptedDelivery ? new Date(selectedRow.exceptedDelivery) : undefined;

  const calculateDaysLate = () => {
    if (!hotelNeedBy || !expectedDelivery) return null;
    const diff = expectedDelivery.getTime() - hotelNeedBy.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : null;
  };

  const daysLate = calculateDaysLate();

  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="flex flex-col gap-2">
        <DateInput 
          label="PO Approval Date" 
          value={poApproval} 
          setValue={(date) => setSelectedRow({ poApproval: date?.toISOString() || null })} 
        />
      </div>
      <div className="flex flex-col gap-2">
        <DateInput 
          label="Hotel Need by Date" 
          value={hotelNeedBy} 
          setValue={(date) => setSelectedRow({ hotelNeedBy: date?.toISOString() || null })} 
        />
      </div>
      <div className="flex flex-col gap-2">
        <DateInput 
          label="Expected Delivery" 
          value={expectedDelivery} 
          setValue={(date) => setSelectedRow({ exceptedDelivery: date?.toISOString() || null })} 
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