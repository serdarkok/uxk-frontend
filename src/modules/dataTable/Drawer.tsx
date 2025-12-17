import { Sheet } from "@/components/ui/Sheet";
import { Single } from "@/modules/drawers/Single";
import { Multiple } from "@/modules/drawers/Multiple";
import { Tracking } from "@/modules/drawers/Tracking";
import { useAppSelector } from "@/store/hooks";
import { selectSelectedShip, selectDrawerType, selectSelectedRows } from "@/store/slices/selectedShipSlice";

interface DrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  isImmediate?: boolean;
}

export function Drawer({ open, setOpen, isImmediate = true }: DrawerProps) {
  const selectedRow = useAppSelector(selectSelectedShip);
  const selectedRows = useAppSelector(selectSelectedRows);
  const drawerType = useAppSelector(selectDrawerType);

  if(drawerType === 'single' && !selectedRow) return null;
  if(drawerType === 'bulk' && selectedRows.length === 0) return null;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
        {drawerType === 'single' && <Single />}
        {drawerType === 'bulk' && <Multiple />}
        {drawerType === 'updateTracking' && <Tracking />}
    </Sheet>
  );
}