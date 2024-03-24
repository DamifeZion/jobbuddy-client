import {
   MySelectItem,
} from "@/components/shared/my-select/my-select";
import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectLabel,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select"
import { FilterSelectProps } from "@/types";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@mui/material";
import { screenConstants } from "@/constants/screen-const";

export const FilterSelect = ({
   type,
   label,
   selectItem,
   iconClassName,
}: FilterSelectProps) => {
   let { smMobileScreenPX } = screenConstants;
   const smMobileScreen = useMediaQuery(`max-width: ${smMobileScreenPX}`)

   // if (smMobileScreen) {
   //    return (
   //       <div></div>
   //    )
   // }


   return (
      <Select>
         <SelectTrigger className="w-fit" >
            <SelectValue placeholder={type} />
         </SelectTrigger>

         <SelectContent>
            <SelectGroup>
               <SelectLabel>{label}</SelectLabel>

               {selectItem.map((data, index) => {
                  const Icon = data.Icon

                  return (
                     <MySelectItem key={index}>
                        {Icon && (
                           <span className={cn(iconClassName)}>
                              <Icon className="w-full h-full"/>
                           </span>
                        )}

                        {data.value}
                     </MySelectItem>
                  )
               })}
            </SelectGroup>
         </SelectContent>
      </Select>
   );
};
