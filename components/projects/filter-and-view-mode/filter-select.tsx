import { MySelectItem } from "@/components/shared/my-select/my-select";
import { useState } from "react";
import {
   Select,
   SelectContent,
   SelectGroup,
   SelectLabel,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { FilterSelectProps } from "@/types";
import { capitalizeFirstLetter } from "@/util/shared/capitalize-first-lettes";

export const FilterSelect = ({
   defaultValue,
   label,
   selectItem,
   iconClassName,
   ...props
}: FilterSelectProps) => {
   return (
      <Select defaultValue={capitalizeFirstLetter(defaultValue)} {...props}>
         <SelectTrigger className="w-fit">
            <SelectValue className="" placeholder={defaultValue} />
         </SelectTrigger>

         <SelectContent className="min-w-[230px]">
            <SelectGroup>
               <SelectLabel className="px-4 capitalize font-medium">
                  {label}
               </SelectLabel>

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
