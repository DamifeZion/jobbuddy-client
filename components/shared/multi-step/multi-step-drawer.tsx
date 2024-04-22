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
   resetSteps,
   setCurrentStep,
   setSteps,
} from "@/services/slices/multi-step-slice/multi-step-slice";
import { StoreRootState } from "@/services/store";
import {
   DrawerContentProps,
   MultiStepDrawerHeaderProps,
   MultiStepDrawerProps,
   MultiStepDrawerTriggerProps,
   MultiStepDrawerFooterProps,
} from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

export const MultiStepDrawer = ({
   children,
   ...props
}: MultiStepDrawerProps) => {
   return <Drawer {...props}>{children}</Drawer>;
};

export const MultiStepDrawerTrigger = ({
   children,
   steps,
   asChild = false,
   onClick,
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
      dispatch(setCurrentStep());
      onClick;
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
   header,
   description,
   headerClassName,
   descriptionClassName,
   dynamicStepTitle = true,
   navigationType = "sequential",
   onPrevClick,
   children,
   ...props
}: MultiStepDrawerHeaderProps) => {
   const dispatch = useDispatch();
   const { currentStep, steps } = useSelector(
      (state: StoreRootState) => state.multiStepSlice
   );

   const defaultStep = (steps && steps[0]) || "";
   // const shouldShowBackButton = currentStep !== defaultStep && !hidePreviousButton;
   const shouldShowBackButton = currentStep && !hidePreviousButton;

   /*NOTE: This ensures we use either headerTitle or dynamicStepTitle but not both.
    * Thus prevents questions like "why is the headerTitle not showing" - when we already have dynamicStepTitle on by default.
    */
   if (navigationType === "sequential" && dynamicStepTitle && header) {
      throw new Error(
         "You can't use both dynamicStepTitle and headerTitle. Set dynamicStepTitle to false to use headerTitle or remove headerTitle to use dynamicStepTitle"
      );
   }

   const handlePrevClick = () => {
      onPrevClick;
      if (currentStep !== steps[0]) {
         return dispatch(prevStep());
      } else {
         dispatch(resetSteps());
      }
   };

   return (
      <DrawerHeader
         className={cn(
            "relative max-lg:px-6 pb-3 pt-1 px-0 text-start",
            className
         )}
         {...props}
      >
         <DrawerTitle
            className={cn(
               "grid grid-flow-col items-center text-lg capitalize",
               headerClassName,
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
                  onClick={handlePrevClick}
               >
                  <BsChevronLeft className="size-5" strokeWidth={0.5} />
               </Button>
            )}

            {/*NOTE: If dynamicStepTitle is on and there is current step we show it. */}
            {dynamicStepTitle && currentStep}

            {/*NOTE: If dynamicStepTitle is on and there is no current step we show the header. */}
            {dynamicStepTitle && !currentStep && header}
         </DrawerTitle>

         {description && (
            <DrawerDescription className={cn(descriptionClassName)}>
               {description}
            </DrawerDescription>
         )}

         <Separator className="w-full absolute bottom-0 left-0" />
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
         className={cn("min-w-[300px] w-full mx-auto pt-0 pb-6", className)}
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
}: MultiStepDrawerFooterProps) => {
   return (
      <DrawerFooter className={cn("pb-4", className)} {...props}>
         {children}
      </DrawerFooter>
   );
};
