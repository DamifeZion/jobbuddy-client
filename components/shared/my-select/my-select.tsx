"use client";
import { MySelectItemProp } from "@/types";
import { cn } from "@/lib/utils";
import { SelectItem } from "@/components/ui/select";

export const MySelectItem = ({
   Icon,
   iconClassName,
   value,
   className,
   children,
   ...props
}: MySelectItemProp) => {
   return (
      <SelectItem value={value} {...props}>
         <span
            className={cn(
               "w-full px-2 flex items-center gap-3 cursor-pointer",
               className
            )}
         >
            {Icon && (
               <span className={cn("", iconClassName)}>
                  {<Icon className="w-5 h-5" />}
               </span>
            )}

            {children}
         </span>
      </SelectItem>
   );
};
