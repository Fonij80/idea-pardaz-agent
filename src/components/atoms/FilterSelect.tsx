import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
  className?: string;
}

export const FilterSelect = ({
  value,
  onValueChange,
  options,
  placeholder,
  className,
}: FilterSelectProps) => {
  return (
    <Select value={value} onValueChange={onValueChange} dir="rtl">
      <SelectTrigger className={`w-[180px] ${className}`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent dir="rtl">
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
