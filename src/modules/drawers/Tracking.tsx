import { 
  SheetContent, 
  SheetHeader, 
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/Sheet";
import { useState } from "react";
import { Planning } from "@/components/item/Planning";
import { Production } from "@/components/item/Production";
import { Shipping } from "@/components/item/Shipping";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { selectSelectedRows, setDrawerOpen } from "@/store/slices/selectedShipSlice";
import { useBulkUpdateShipsMutation } from "@/store/api/shipsApi";
import { Button } from "@/components/ui/Button";
import type { IShip } from "@/types/ship";
import { toast } from "sonner";

export function Tracking() {
  const dispatch = useAppDispatch();
  const selectedRows = useAppSelector(selectSelectedRows);
  const [fields, setFields] = useState<Partial<IShip>>({});
  const [bulkUpdate] = useBulkUpdateShipsMutation();

  if (!selectedRows.length) return null;
  
  const ids: number[] = selectedRows.map((row: IShip) => parseInt(row.id.toString()));

  const handleBulkUpdate = async () => {
    try {
      await bulkUpdate({ ids, fields });
      dispatch(setDrawerOpen(false));
      setFields({});
      toast.success('Ships updated successfully');
    } catch (error) {
      console.error('Failed to update ships:', error);
      toast.error('Failed to update ships');
    }
  };


  return (
  <div className="flex flex-col gap-5 py-4">
    <SheetContent className="bg-gray-100 dark:bg-gray-900 overflow-y-auto sm:max-w-4xl">
      <SheetHeader>
        <SheetTitle asChild>
          <div className="flex flex-col items-start gap-4">
            <h4>Update Tracking</h4>
            <span className="text-sm font-normal"><strong>{selectedRows.length}</strong> will be updated</span>
          </div>
        </SheetTitle>
        <SheetDescription></SheetDescription>
      </SheetHeader>
      <div className="flex flex-col gap-6 bg-white dark:bg-gray-800 mx-3 p-6 rounded-md">
        <h5 className="text-lg font-bold">Planning & Requirements</h5>
        <Planning selectedRow={fields as Pick<IShip, 'poApproval' | 'hotelNeedBy' | 'exceptedDelivery'>} setSelectedRow={(data) => setFields({ ...fields, ...data })} />
      </div>
      <div className="flex flex-col gap-6 bg-white dark:bg-gray-800 mx-3 p-6 rounded-md">
        <h5 className="text-lg font-bold">Production & Shop</h5>
        <Production selectedRow={fields as Pick<IShip, 'shopsSend' | 'shopsApproved' | 'shopsDelivered'>} setSelectedRow={(data) => setFields({ ...fields, ...data })} />
      </div>
      <div className="flex flex-col gap-6 bg-white dark:bg-gray-800 mx-3 p-6 rounded-md">
        <h5 className="text-lg font-bold">Shipping</h5>
        <Shipping selectedRow={fields as Pick<IShip, 'ordered' | 'shipped' | 'delivered' | 'notes'>} setSelectedRow={(data) => setFields({ ...fields, ...data })} isImmediate={false} />
      </div>
      <SheetFooter className="flex flex-row items-start justify-start gap-2">
        <Button variant="outline" size='xl' onClick={() => {
          dispatch(setDrawerOpen(false));
          setFields({});
        }}>
          Cancel
        </Button>
        <Button size='xl' variant='destructive' onClick={() => handleBulkUpdate()}>
          Save Changes
        </Button>
      </SheetFooter>
    </SheetContent>
  </div>
  )
}