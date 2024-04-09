import {
   DropdownMenuSubTrigger,
   DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
   AnimatedDropdownProp,
   MyDropdownMenuItemProp,
   MyDropdownMenuSubTriggerProp,
} from "@/types";
import { motion } from "framer-motion";

export const MyDropdownMenuItem = ({
   children,
   Icon,
   iconClassName,
   ...props
}: MyDropdownMenuItemProp) => {
   return (
      <DropdownMenuItem className={cn("w-full !cursor-pointer")} {...props}>
         {Icon && (
            <span className={cn("text-xl mr-3", iconClassName)}>
               <Icon className="w-full h-full" />
            </span>
         )}

         {children}
      </DropdownMenuItem>
   );
};

export const MyDropdownMenuSubTrigger = ({
   children,
   Icon,
   iconClassName,
   active,
   ...props
}: MyDropdownMenuSubTriggerProp) => {
   return (
      <DropdownMenuSubTrigger
         className={cn(
            "w-full cursor-pointer !bg-transparent hover:!bg-accent",
            {
               "!bg-accent": active,
            }
         )}
         {...props}
      >
         {Icon && (
            <span className={cn("text-xl mr-3", iconClassName)}>
               <Icon className="w-full h-full" />
            </span>
         )}

         {children}
      </DropdownMenuSubTrigger>
   );
};

export const AnimatedDropdown = ({
   open,
   className,
   children,
   ...props
}: AnimatedDropdownProp) => {
   const slideDownAnimation = {
      active: {
         height: "auto",
         opacity: 1,
         transition: { duration: 0.2, ease: "easeOut" },
      },
      inactive: {
         height: 0,
         opacity: 0,
         transition: { duration: 0.2, ease: "easeIn" },
      },
   };

   return (
      <motion.div
         initial="inactive"
         animate={open ? "active" : "inactive"}
         exit="inactive"
         variants={slideDownAnimation}
         className={cn("overflow-y-hidden", className)}
         {...props}
      >
         {children}
      </motion.div>
   );
};
