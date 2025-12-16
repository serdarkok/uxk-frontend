import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetFooter
} from "@/components/ui/Sheet";
import { Button } from "@/components/ui/Button";
import { Summary } from "@/components/item/Summary";
import { Planning } from "@/components/item/Planning";
import { Production } from "@/components/item/Production";
import { Shipping } from "@/components/item/Shipping";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { selectSelectedShip, updateSelectedShip } from "@/store/slices/selectedShipSlice";
import { useUpdateShipMutation } from "@/store/api/shipsApi";
import type { IShip } from "@/types/ship";

interface DrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  isImmediate?: boolean;
}

export function Drawer({ open, setOpen, isImmediate = true }: DrawerProps) {
  const dispatch = useAppDispatch();
  const selectedRow = useAppSelector(selectSelectedShip);
  const [updateShip, { isLoading }] = useUpdateShipMutation();

  if (!selectedRow) return null;

  const handleImmediateUpdate = async (updatedData: Partial<IShip>) => {
    try {
      dispatch(updateSelectedShip(updatedData));
      
      if (isImmediate) {
        await updateShip({
          id: selectedRow.id,
          data: updatedData,
        }).unwrap();
      }
    } catch (error) {
      console.error('Failed to update ship:', error);
    }
  };

  const handleSave = async () => {
    try {
      await updateShip({
        id: selectedRow.id,
        data: {
          poApproval: selectedRow.poApproval,
          hotelNeedBy: selectedRow.hotelNeedBy,
          exceptedDelivery: selectedRow.exceptedDelivery,
          shopsSend: selectedRow.shopsSend,
          shopsApproved: selectedRow.shopsApproved,
          shopsDelivered: selectedRow.shopsDelivered,
          ordered: selectedRow.ordered,
          shipped: selectedRow.shipped,
          delivered: selectedRow.delivered,
          notes: selectedRow.notes,
        },
      }).unwrap();
      setOpen(false);
    } catch (error) {
      console.error('Failed to update ship:', error);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };


  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="bg-gray-100 dark:bg-gray-900 overflow-y-auto sm:max-w-4xl">
        <SheetHeader>
          <SheetTitle asChild>
            <div className="flex items-center gap-2">
              <h4>Item #{selectedRow?.itemId} - {selectedRow?.item?.name}</h4>
              {isImmediate && isLoading && (
                <span className="text-sm text-muted-foreground animate-pulse">Saving...</span>
              )}
            </div>
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-5 py-4">
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
              isImmediate={isImmediate}
            />
          </div>
        </div>

        <SheetFooter>
          {!isImmediate && (
            <>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}