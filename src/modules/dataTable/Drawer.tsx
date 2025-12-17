import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetFooter
} from "@/components/ui/Sheet";
import { Button } from "@/components/ui/Button";
import { Single } from "@/modules/drawers/Single";
import { Multiple } from "@/modules/drawers/Multiple";
import { Tracking } from "@/modules/drawers/Tracking";
import { useAppSelector } from "@/store/hooks";
import { selectSelectedShip, selectDrawerType } from "@/store/slices/selectedShipSlice";
import { useUpdateShipMutation } from "@/store/api/shipsApi";
import { toast } from "sonner";

interface DrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  isImmediate?: boolean;
}

export function Drawer({ open, setOpen, isImmediate = true }: DrawerProps) {
  const selectedRow = useAppSelector(selectSelectedShip);
  const drawerType = useAppSelector(selectDrawerType);
  const [updateShip, { isLoading }] = useUpdateShipMutation();

  if (!selectedRow) return null;


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
      toast.success('Ship updated successfully');
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
            </div>
          </SheetTitle>
        </SheetHeader>

        {drawerType === 'single' && <Single />}
        {drawerType === 'bulk' && <Multiple />}
        {drawerType === 'updateTracking' && <Tracking />}

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