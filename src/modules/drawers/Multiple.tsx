import { 
  SheetContent, 
  SheetHeader, 
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/Sheet";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { useGetLocationsQuery } from "@/store/api/locationsApi";
import { useGetCategoriesQuery } from "@/store/api/categoriesApi";
import { selectSelectedRows } from "@/store/slices/selectedShipSlice";
import { SelectInput } from "@/modules/items/SelectInput";
import { Textarea } from "@/components/ui/Textarea";
import { Input } from "@/components/ui/Input";
import { toast } from "sonner";
import { useBulkUpdateShipsMutation } from "@/store/api/shipsApi";
import { setDrawerOpen } from "@/store/slices/selectedShipSlice";
import type { IShip } from "@/types/ship";

export function Multiple() {
  const dispatch = useAppDispatch();
  const selectedRows = useAppSelector(selectSelectedRows);
  const [fields, setFields] = useState<Partial<IShip>>({});
  const [bulkUpdate] = useBulkUpdateShipsMutation();
  const { data: locationsData = [] } = useGetLocationsQuery();
  const { data: categoriesData = [] } = useGetCategoriesQuery();

  if (!selectedRows.length) return null;
  
  const ids: number[] = selectedRows.map((row: IShip) => parseInt(row.id.toString()));

  const categories = categoriesData.map((category) => ({
    value: category.id,
    name: category.name,
  }));

  const locations = locationsData.map((location) => ({
    value: location.id,
    name: location.name,
  }));

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
            <h4>Bulk Edit</h4>
            <span className="text-sm font-normal"><strong>{selectedRows.length}</strong> will be updated</span>
          </div>
        </SheetTitle>
        <SheetDescription></SheetDescription>
      </SheetHeader>
      <div className="flex flex-col gap-6 bg-white dark:bg-gray-800 mx-3 p-6 rounded-md">
        <h5 className="text-lg font-bold">Items Details</h5>
        <div className="flex flex-row gap-3 justify-between items-center">
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm font-medium">Location</label>
            <SelectInput 
              className="w-full" 
              values={locations} 
              label="Location" 
              setValue={(value) => setFields({ ...fields, locationId: Number(value) })} 
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm font-medium">Category</label>
            <SelectInput 
              className="w-full" 
              values={categories} 
              label="Category" 
              setValue={(value) => setFields({ ...fields, categoryId: Number(value) })} 
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Ship From</label>
          <Input
            value={fields.shipFrom || ''}
            onChange={(e) => setFields({ ...fields, shipFrom: e.target.value })}
            placeholder="Enter ship from location..."
            className="h-12"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Notes for this item</label>
          <Textarea
            value={fields.notes || ''}
            onChange={(e) => setFields({ ...fields, notes: e.target.value })}
            placeholder="Enter notes..."
            className="min-h-24"
          />
        </div>
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