import { useDispatch, useSelector } from "react-redux";
import {
   prevStep,
   setCurrentStep,
   setStepTitles,
   setSteps,
} from "@/services/slices/multi-step-slice/multi-step-slice";
import {
   MultiStepDropdownMenuSubTriggerProps,
   MultiStepDropdownMenuLabelProps,
} from "@/types";
import {
   DropdownMenuSubTrigger,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StoreRootState } from "@/services/store";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { cn } from "@/lib/utils";
import { BsChevronLeft } from "react-icons/bs";
import { Button } from "@/components/ui/button";

export const MultiStepDropdownMenuSubTrigger = ({
   children,
   stepTitles,
   steps,
   asChild = false,
   onClick,
   ...props
}: MultiStepDropdownMenuSubTriggerProps) => {
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
      onClick;
   };

   return (
      <DropdownMenuSubTrigger
         asChild={asChild}
         onClick={handleClick}
         {...props}
      >
         {children}
      </DropdownMenuSubTrigger>
   );
};

export const MultiStepDropdownMenuLabel = ({
   className,
   hidePreviousButton = false,
   onPrevClick,
   children,
   ...props
}: MultiStepDropdownMenuLabelProps) => {
   const dispatch = useDispatch();
   const { currentStep, steps, currentTitle } = useSelector(
      (state: StoreRootState) => state.multiStepSlice
   );

   const defaultStep = (steps && steps[0]) || "";
   const shouldShowBackButton =
      currentStep !== defaultStep && !hidePreviousButton;

   return (
      <DropdownMenuLabel
         className={cn(
            "grid grid-flow-col items-center text-start",
            className,
            {
               "grid-cols-[36px_1fr] gap-2": shouldShowBackButton,
            }
         )}
         {...props}
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

         {currentTitle || children}
      </DropdownMenuLabel>
   );
};
