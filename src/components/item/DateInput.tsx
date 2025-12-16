import { DatePicker } from "../ui/DatePicker";

export function DateInput({ label, value, setValue }: { label: string,value: Date | undefined, setValue: (value: Date | undefined) => void }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">{ label }</label>
      <DatePicker
        date={value}
        onSelect={setValue}
        placeholder="Select date"
      />
    </div>
  )
}