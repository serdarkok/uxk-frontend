import { Search } from "lucide-react"
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/InputGroup';
import { cn } from '@/lib/utils';

export function SearchInput({ className }: { className?: string }) {
  return (
    <InputGroup className={cn('h-12', className)}>
      <InputGroupInput placeholder="Find by Item Name, Item # or Spec #" />
      <InputGroupAddon>
        <Search className="transform -scale-x-100" />
      </InputGroupAddon>
    </InputGroup>
  )
}