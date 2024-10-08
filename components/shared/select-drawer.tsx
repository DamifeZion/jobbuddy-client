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
import { StoreRootState } from "@/services/redux-provider/store";
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
               className
            )}
            {...props}
         >
            {children}

            <CaretSortIcon className="ml-auto size-5 opacity-50" />
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
   children,
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

   const renderChildren = () => {
      if (!children) {
         return (
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
         );
      }

      return children;
   };

   return (
      <DrawerClose asChild className="w-full">
         <Button
            variant="ghost"
            onClick={handleClick}
            className={cn(
               "flex w-full cursor-pointer select-none rounded-none items-center py-6 px-4 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
               className
            )}
            {...props}
         >
            {renderChildren()}

            {isSelected && (
               <span className="ml-auto flex size-6 items-center justify-center">
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
         className="px-4 py-2 text-xl font-semibold capitalize text-start text-pretty border-b border-border"
         {...props}
      >
         {children}
      </DrawerHeader>
   );
};
