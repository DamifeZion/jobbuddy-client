"use client";
import { BsChevronLeft } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { StoreRootState } from "@/services/store";
import {
   MultiStepDialogHeaderProps,
   MultiStepDialogContentProps,
   MultiStepDialogProps,
   MultiStepDialogTriggerProps,
} from "@/types";
import { cn } from "@/lib/utils";
import {
   prevStep,
   resetSteps,
   setCurrentStep,
   setStepTitles,
   setSteps,
} from "@/services/slices/multi-step-slice/multi-step-slice";

export const MultiStepDialog = ({
   children,
   ...props
}: MultiStepDialogProps) => {
   const dispatch = useDispatch();
   //NOTE: When dialog is closed, we want to simply reset the step and reset the current step

   return (
      <Dialog
         {...props}
         onOpenChange={(open) => !open && dispatch(resetSteps())}
      >
         {children}
      </Dialog>
   );
};

export const MultiStepDialogTrigger = ({
   children,
   steps,
   stepTitles,
   ...props
}: MultiStepDialogTriggerProps) => {
   const dispatch = useDispatch();

   let modalSteps: string | string[];

   //NOTE: If  there is step titles, we simply set it, once the component mounts.
   if (stepTitles) {
      dispatch(setStepTitles(stepTitles));
   }

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
   };

   return (
      <DialogTrigger onClick={handleClick} {...props}>
         {children}
      </DialogTrigger>
   );
};

export const MulstiStepDialogHeader = ({
   hidePreviousButton = false,
   headerTitle,
   headerDescription,
   headerTitleClassName,
   headerDescriptionClassName,
   onPrevClick,
   children,
   ...props
}: MultiStepDialogHeaderProps) => {
   const dispatch = useDispatch();
   const { currentStep, steps, currentTitle } = useSelector(
      (state: StoreRootState) => state.multiStepSlice
   );

   const defaultStep = (steps && steps[0]) || "";
   const shouldShowBackButton =
      currentStep !== defaultStep && !hidePreviousButton;

   return (
      <div>
         <DialogHeader {...props}>
            <DialogTitle
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

               <div>{currentTitle || headerTitle}</div>
            </DialogTitle>

            {headerDescription && (
               <DialogDescription className={cn(headerDescriptionClassName)}>
                  {headerDescription}
               </DialogDescription>
            )}
         </DialogHeader>
      </div>
   );
};

export const MultiStepDialogContent = ({
   children,
   ...props
}: MultiStepDialogContentProps) => {
   return (
      <div>
         <DialogContent {...props}>{children}</DialogContent>
      </div>
   );
};
