"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover";
import { DatePickerProps } from "@/types";

export const DatePicker = ({
   mode = "single",
   defaultValue,
   onValueChange,
}: DatePickerProps) => {
   const [date, setDate] = useState<Date>();
   const defaultValueRef = useRef(defaultValue);

   //NOTE: This hook will run only on the initial render
   useEffect(() => {
      defaultValueRef.current = defaultValue;
   }, [defaultValue]);

   useEffect(() => {
      if (defaultValueRef.current) {
         setDate(defaultValueRef.current);
      }
   }, []);

   const memoizedOnValueChange = useCallback(onValueChange, []);

   useEffect(() => {
      if (memoizedOnValueChange && date) {
         memoizedOnValueChange(date);
      }
   }, [date, memoizedOnValueChange]); //NOTE: Adding onValueChange will cause unnecessary re-rendering and break app.

   // console.log(date);

   return (
      <Popover>
         <PopoverTrigger asChild>
            <Button
               variant={"outline"}
               className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
               )}
            >
               <CalendarIcon className="mr-2 h-4 w-4" />
               {defaultValue ? (
                  format(defaultValue, "PPP")
               ) : date ? (
                  format(date, "PPP")
               ) : (
                  <span>Pick a date</span>
               )}
            </Button>
         </PopoverTrigger>

         <PopoverContent className="w-full p-0">
            <Calendar
               mode={mode}
               selected={date}
               onSelect={setDate}
               initialFocus
            />
         </PopoverContent>
      </Popover>
   );
};
