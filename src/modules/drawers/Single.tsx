import { 
  SheetContent, 
  SheetHeader, 
  SheetTitle,
  SheetDescription,
} from "@/components/ui/Sheet";
import type { IShip } from "@/types/ship";
import { Summary } from "@/components/item/Summary";
import { Planning } from "@/components/item/Planning";
import { Production } from "@/components/item/Production";
import { Shipping } from "@/components/item/Shipping";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { selectSelectedShip, updateSelectedShip } from "@/store/slices/selectedShipSlice";
import { useUpdateShipMutation } from "@/store/api/shipsApi";
import { toast } from "sonner";

export function Single() {
  const dispatch = useAppDispatch();
  const selectedRow = useAppSelector(selectSelectedShip);
  if (!selectedRow) return null;
  const [updateShip] = useUpdateShipMutation();
  const handleImmediateUpdate = async (updatedData: Partial<IShip>) => {
    try {
      dispatch(updateSelectedShip(updatedData));      
      await updateShip({
        id: selectedRow.id,
        data: updatedData,
      }).unwrap();
      toast.success('Ship updated successfully');
    } catch (error) {
      console.error('Failed to update ship:', error);
    }
  };

  return (
  <div className="flex flex-col gap-5 py-4">
    <SheetContent className="bg-gray-100 dark:bg-gray-900 overflow-y-auto sm:max-w-4xl">
      <SheetHeader>
        <SheetTitle asChild>
          <div className="flex items-center gap-2">
            <h4>Item #{selectedRow?.itemId} - {selectedRow?.item?.name}</h4>
          </div>
        </SheetTitle>
        <SheetDescription></SheetDescription>
      </SheetHeader>
      <Summary selectedRow={selectedRow} />

      <div className="flex flex-col gap-6 bg-white dark:bg-gray-800 mx-3 p-6 rounded-md">
        <h5 className="text-lg font-bold">Planning & Requirements</h5>
        <Planning 
          selectedRow={selectedRow} 
          setSelectedRow={handleImmediateUpdate}
        />
      </div>

      <div className="flex flex-col gap-6 bg-white dark:bg-gray-800 mx-3 p-6 rounded-md">
        <h5 className="text-lg font-bold">Production & Shop</h5>
        <Production 
          selectedRow={selectedRow} 
          setSelectedRow={handleImmediateUpdate}
        />
      </div>

      <div className="flex flex-col gap-6 bg-white dark:bg-gray-800 mx-3 p-6 rounded-md">
        <h5 className="text-lg font-bold">Shipping</h5>
        <Shipping 
          selectedRow={selectedRow} 
          setSelectedRow={handleImmediateUpdate}
          isImmediate={true}
        />
      </div>
    </SheetContent>
  </div>
  )
}