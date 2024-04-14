import { MySelectItem } from "@/components/shared/my-select/my-select";
import { useMediaQuery } from "@mui/material";
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
import {
   screenConstants,
   visibleViewportHeight,
} from "@/constants/screen-const";

import {
   SelectDrawer,
   SelectDrawerContent,
   SelectDrawerHeader,
   SelectDrawerItem,
   SelectDrawerTrigger,
} from "@/components/shared/select-drawer/select-drawer";

export const FilterSelect = ({
   defaultValue,
   label,
   selectItem,
   iconClassName,
   onValueChange,
   ...props
}: FilterSelectProps) => {
   const initialValue = useCapitalizeFirstLetter(defaultValue);
   const smMobileScreen = useMediaQuery(
      `(max-width: ${screenConstants.SM_Mobile_Screen_PX})`
   );

   //=== SCREEN SMALLER THAN (640px) BEGINS ===//
   if (smMobileScreen) {
      return (
         <SelectDrawer>
            <SelectDrawerTrigger>{initialValue}</SelectDrawerTrigger>

            <SelectDrawerContent className="w-full">
               <SelectGroup>
                  <SelectDrawerHeader> {label} </SelectDrawerHeader>

                  <SelectSeparator />

                  {selectItem.map((data, index) => {
                     const Icon = data.Icon;
                     // const isSelected = data.value === initialValue;

                     return (
                        <SelectDrawerItem
                           key={index}
                           defaultValue={initialValue}
                           value={data.value}
                           onValueChange={onValueChange}
                        />
                     );
                  })}
               </SelectGroup>
            </SelectDrawerContent>
         </SelectDrawer>
      );
   }

   //=== SCREEN SMALLER THAN (640px) ENDS ===//

   //=== SCREEN LARGER THAN (640px) BEGINS ===//
   return (
      <Select key={initialValue} defaultValue={initialValue} {...props}>
         <SelectTrigger className="w-fit py-4 h-11">
            <SelectValue placeholder={initialValue} />
         </SelectTrigger>

         <SelectContent
            style={{ maxHeight: `calc(${visibleViewportHeight} - 80px)` }}
            className="min-w-[230px] overflow-y-auto"
         >
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
