import { Button } from "@/components/ui/Button";
import { Trash2, SquarePen, CopySlash, CopyPlus } from "lucide-react";
import type { IShip } from "@/types/ship";


export function SelectedRows({ selectedRows }: { selectedRows: IShip[] }) {
  return (
    <>
      {selectedRows.length > 0 && (
        <div className='flex w-full items-center justify-left gap-2'>
          <span className='text-sm'>
            {selectedRows.length} item{selectedRows.length !== 1 ? 's' : ''} selected
          </span>
          <Button variant="link" className="gap-1">
            <CopySlash className='w-3 h-3' />
            Bulk Edit
          </Button>
          <Button variant="link" className="gap-1">
            <CopyPlus className='w-3 h-3' />
            Update Tracking
          </Button>
          <Button variant="link" className="gap-1">
            <SquarePen className='w-3 h-3' />
            Create PO
          </Button>
          <Button variant="link" className="text-red-700 gap-1">
            <Trash2 className='w-3 h-3' />
            Delete
          </Button>
        </div>
      )}
    </>
  )
}