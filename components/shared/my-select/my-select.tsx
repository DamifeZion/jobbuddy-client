"use client";
import { MySelectItemProp } from "@/types";
import { cn } from "@/lib/utils";
import {
   SelectItem,
   Select,
   SelectContent,
   SelectTrigger,
} from "@/components/ui/select";
import { useMediaQuery } from "@mui/material";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

export const MySelectItem = ({
   Icon,
   iconClassName,
   value,
   className,
   children,
   ...props
}: MySelectItemProp) => {
   return (
      <SelectItem
         value={value}
         className={cn("w-full flex items-center gap-3 cursor-pointer", className)}
         {...props}
      >
         {Icon && (
            <span className={cn("text-xl mr-3", iconClassName)}>
               {<Icon className="w-full h-full" />}
            </span>
         )}

         {children}
      </SelectItem>
   );
};
