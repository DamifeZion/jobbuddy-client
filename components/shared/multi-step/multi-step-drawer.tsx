"use client";
import { BsChevronLeft } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import {
   Drawer,
   DrawerTrigger,
   DrawerDescription,
   DrawerHeader,
   DrawerTitle,
   DrawerContent,
   DrawerFooter,
} from "@/components/ui/drawer";
import {
   prevStep,
   setCurrentStep,
   setSteps,
} from "@/services/slices/multi-step-slice/multi-step-slice";
import { StoreRootState } from "@/services/store";
import {
   DrawerContentProps,
   MultiStepDrawerHeaderProps,
   MultiStepDrawerProps,
   MultiStepDrawerTriggerProps,
   MultiStepFooterProps,
} from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { cn } from "@/lib/utils";

export const MultiStepDrawer = ({ children }: MultiStepDrawerProps) => {
   return <Drawer>{children}</Drawer>;
};

export const MultiStepDrawerTrigger = ({
   children,
   steps,
   asChild = false,
   ...props
}: MultiStepDrawerTriggerProps) => {
   const dispatch = useDispatch();

   let modalSteps: string | string[];

   //NOTE: Check the type of steps and assign modalSteps accordingly
   if (Array.isArray(steps)) {
      modalSteps = steps;
   } else if (typeof steps === "object") {
      modalSteps = Object.values(steps);
   } else if (typeof steps === "string") {
      modalSteps = [steps];
   }

   //NOTE: When the component mounts or when steps change, update the steps in the state
   const handleClick = () => {
      //NOTE: Load all steps into the step slice
      dispatch(setSteps(modalSteps));
      dispatch(setCurrentStep(modalSteps[0]));
   };

   return (
      <DrawerTrigger asChild={asChild} onClick={handleClick} {...props}>
         {children}
      </DrawerTrigger>
   );
};

export const MultiStepDrawerHeader = ({
   className,
   hidePreviousButton = false,
   headerTitle,
   headerDescription,
   headerTitleClassName,
   headerDescriptionClassName,
   onPrevClick,
   children,
   ...props
}: MultiStepDrawerHeaderProps) => {
   const dispatch = useDispatch();
   const { currentStep, steps } = useSelector(
      (state: StoreRootState) => state.multiStepSlice
   );

   const defaultStep = (steps && steps[0]) || "";
   const shouldShowBackButton =
      currentStep !== defaultStep && !hidePreviousButton;

   return (
      <DrawerHeader
         className={cn("pt-2 px-0 text-start", className)}
         {...props}
      >
         <DrawerTitle
            className={cn(
               "grid grid-flow-col items-center",
               headerTitleClassName,
               {
                  "grid-cols-[36px_1fr] gap-2": shouldShowBackButton,
               }
            )}
         >
            {shouldShowBackButton && (
               <Button
                  variant="ghost"
                  size="icon"
                  className="p-0"
                  onClick={() => {
                     dispatch(prevStep());
                     onPrevClick;
                  }}
               >
                  <BsChevronLeft className="size-5" strokeWidth={0.5} />
               </Button>
            )}

            <div>{headerTitle}</div>
         </DrawerTitle>

         {headerDescription && (
            <DrawerDescription className={cn(headerDescriptionClassName)}>
               {headerDescription}
            </DrawerDescription>
         )}
      </DrawerHeader>
   );
};

export const MultiStepDrawerContent = ({
   children,
   className,
   showLine = false,
   ...props
}: DrawerContentProps) => {
   return (
      <DrawerContent
         showLine={showLine}
         className={cn("min-w-[300px] mx-auto px-6 py-3", className)}
         {...props}
      >
         {children}
      </DrawerContent>
   );
};

export const MultiStepFooter = ({
   className,
   children,
   ...props
}: MultiStepFooterProps) => {
   return (
      <DrawerFooter className={cn("px-0", className)} {...props}>
         {children}
      </DrawerFooter>
   );
};
