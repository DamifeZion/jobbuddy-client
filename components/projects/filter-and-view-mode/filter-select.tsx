import { MySelectItem } from "@/components/shared/my-select/my-select";
import { useState } from "react";
import {
   Select,
   SelectContent,
   SelectGroup,
   SelectLabel,
   SelectSeparator,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { FilterSelectProps } from "@/types";
import { useCapitalizeFirstLetter } from "@/hooks/shared/useCapitalizeFirstLetter"; 

export const FilterSelect = ({
   defaultValue,
   label,
   selectItem,
   iconClassName,
   ...props
}: FilterSelectProps) => {
   const initialValue = useCapitalizeFirstLetter(defaultValue);

   return (
      <Select key={initialValue} defaultValue={initialValue} {...props}>
         <SelectTrigger className="w-fit">
            <SelectValue className="" placeholder={initialValue} />
         </SelectTrigger>

         <SelectContent className="min-w-[230px]">
            <SelectGroup>
               <SelectLabel className="px-4 capitalize font-medium">
                  {label}
               </SelectLabel>

               <SelectSeparator />

               {selectItem.map((data, index) => {
                  const Icon = data.Icon;

                  return (
                     <MySelectItem
                        value={data.value}
                        key={index}
                        // Icon={Icon}
                     >
                        {data.value}
                     </MySelectItem>
                  );
               })}
            </SelectGroup>
         </SelectContent>
      </Select>
   );
};
