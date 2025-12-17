import { Select, SelectContent, SelectTrigger, SelectValue, SelectGroup, SelectItem } from '@/components/ui/Select';
import { X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

type IValue = {
  value: string | number;
  name: string | number;
}

interface IProps {
  values: IValue[];
  label: string;
  className?: string;
  setValue: (value: string) => void;
}

export function SelectInput(props: IProps) {
  const [selectedValue, setSelectedValue] = useState<string>('');

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedValue('');
    props.setValue('');
  };

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
    props.setValue(value);
  };

  return (
    <div className="relative inline-block">
      <Select value={selectedValue} onValueChange={handleValueChange}>
        <SelectTrigger className={cn("w-[180px]", props?.className)} size="lg">
          <SelectValue placeholder={props?.label} />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectGroup className='max-h-[250px]'>
            { props?.values.map((item: IValue) => <SelectItem key={item.value} value={item.value.toString()}>{item.name}</SelectItem> ) }
          </SelectGroup>
        </SelectContent>
      </Select>
      {selectedValue && (
        <button
          onClick={handleClear}
          className="absolute right-8 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Clear selection"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  )
}