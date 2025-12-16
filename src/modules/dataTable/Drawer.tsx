import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetFooter
} from "@/components/ui/Sheet";
import { Button } from "@/components/ui/Button";
import { Summary } from "@/components/item/Summary";

export function Drawer({ open, setOpen, selectedRow }: { open: boolean, setOpen: (open: boolean) => void, selectedRow: any }) {
  if (!selectedRow) return null;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="bg-gray-100 dark:bg-gray-900 overflow-y-auto sm:max-w-4xl">
        <SheetHeader>
          <SheetTitle asChild>
            <div className="flex items-center gap-2">
              <h4>Item #{selectedRow?.itemId} - {selectedRow?.item?.name}</h4>
              <Button variant="link" className="underline">Edit</Button>
            </div>
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-5 py-4">
          {/* Section 1 */}
          <Summary selectedRow={selectedRow} />
          <div className="flex flex-col gap-2 bg-white dark:bg-gray-800 mx-3 p-6 rounded-md">Section 2</div>
          <div className="flex flex-col gap-2 bg-white dark:bg-gray-800 mx-3 p-6 rounded-md">Section 3</div>
        </div>
        

        <SheetFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button>Save Changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}