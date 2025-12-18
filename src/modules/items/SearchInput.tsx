import { Search } from "lucide-react"
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/InputGroup';
import { cn } from '@/lib/utils';

interface SearchInputProps {
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

export function SearchInput({ 
  className, 
  value, 
  onChange,
  placeholder = "Find by Item Name or Spec#"
}: SearchInputProps) {
  return (
    <InputGroup className={cn('h-12', className)}>
      <InputGroupInput 
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
      <InputGroupAddon>
        <Search className="transform -scale-x-100" />
      </InputGroupAddon>
    </InputGroup>
  )
}