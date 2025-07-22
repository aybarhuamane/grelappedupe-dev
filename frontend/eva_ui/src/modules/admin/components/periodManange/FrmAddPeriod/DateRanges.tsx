import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";

interface DateRangesProps {
  onChange: (startDate: Date | undefined, endDate: Date | undefined) => void;
  value: DateRange | undefined;
  className?: string;
}

export function DateRanges({ onChange, value, className }: DateRangesProps) {
  const [date, setDate] = useState<DateRange | undefined>(value);

  const handleDateChange = (selectedDate: DateRange | undefined) => {
    setDate(selectedDate);
    onChange(selectedDate?.from, selectedDate?.to);
  };

  return (
    <div className={`grid gap-2 ${className}`}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={`w-[400px] justify-start text-left font-normal ${!date && "text-muted-foreground"}`}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "yyyy-MM-dd", { locale: es })} - {format(date.to, "yyyy-MM-dd", { locale: es })}
                </>
              ) : (
                format(date.from, "yyyy-MM-dd", { locale: es })
              )
            ) : (
              <span>
                Selecciona un rango de fechas
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateChange}
            numberOfMonths={2}
            locale={es}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
