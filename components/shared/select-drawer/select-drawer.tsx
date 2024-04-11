//NOTE: This component should be used for only mobile devices. As the name drawer applies to small screens.
import { Button } from "@/components/ui/button";
import {
   DrawerContent,
   DrawerHeader,
   DrawerTrigger,
   DrawerClose,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { setSelectedValue } from "@/services/slices/custom-ui-slice/select-drawer-slice";
import { StoreRootState } from "@/services/store";
import {
   SelectDrawerContentProps,
   SelectDrawerHeaderProps,
   SelectDrawerItemProps,
   SelectDrawerTriggerProps,
} from "@/types";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import { Drawer as DrawerPrimitive } from "vaul";

export const SelectDrawer = ({
   shouldScaleBackground = true,
   children,
   ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => {
   return (
      <DrawerPrimitive.Root
         shouldScaleBackground={shouldScaleBackground}
         {...props}
      >
         {children}
      </DrawerPrimitive.Root>
   );
};

export const SelectDrawerTrigger = ({
   children,
   className,
   ...props
}: SelectDrawerTriggerProps) => {
   return (
      <DrawerTrigger asChild>
         <Button
            className={cn(
               "flex h-11 w-full items-center justify-center whitespace-nowrap rounded-sm border border-input bg-transparent px-3 gap-2 py-2 text-sm shadow-sm ring-offset-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
               {
                  className,
               }
            )}
            {...props}
         >
            {children}

            <CaretSortIcon className="h-4 w-4 opacity-50" />
         </Button>
      </DrawerTrigger>
   );
};

export const SelectDrawerContent = ({
   children,
   showLine = false,
   className,
   ...props
}: SelectDrawerContentProps) => {
   return (
      <DrawerContent
         showLine={showLine}
         className={cn("py-2", className)}
         {...props}
      >
         {children}
      </DrawerContent>
   );
};

export const SelectDrawerItem = ({
   Icon,
   iconClassName,
   value,
   className,
   isSelected,
   defaultValue,
   onValueChange,
   onClick,
   ...props
}: SelectDrawerItemProps) => {
   const dispatch = useDispatch();
   const { selectedValue } = useSelector(
      (state: StoreRootState) => state.selectDrawerSlice
   );

   const handleClick = () => {
      onClick;

      if (onValueChange) {
         onValueChange(value);
      }

      dispatch(setSelectedValue(value));
   };

   const activeValue = () => {
      if (defaultValue) {
         return (isSelected = value === defaultValue);
      }

      isSelected = value === selectedValue;
   };

   activeValue();

   return (
      <DrawerClose className="w-full">
         <Button
            variant="ghost"
            onClick={handleClick}
            className={cn(
               "relative flex w-full cursor-pointer select-none rounded-none items-center py-5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
               className
            )}
            {...props}
         >
            <span
               className={cn(
                  "w-full px-2 flex items-center gap-3 cursor-pointer text-[1rem]",
                  className
               )}
            >
               {Icon && (
                  <span className={cn("", iconClassName)}>
                     {<Icon className="size-[24px]" />}
                  </span>
               )}

               {value}
            </span>

            {isSelected && (
               <span className="absolute right-3 flex size-5 items-center justify-center">
                  <CheckIcon className="size-6" />
               </span>
            )}
         </Button>
      </DrawerClose>
   );
};

export const SelectDrawerHeader = ({
   children,
   ...props
}: SelectDrawerHeaderProps) => {
   return (
      <DrawerHeader
         className="text-xl font-semibold py-2 capitalize text-start text-pretty"
         {...props}
      >
         {children}
      </DrawerHeader>
   );
};
