import { useDispatch, useSelector } from "react-redux";
import {
   prevStep,
   setCurrentStep,
   setSteps,
} from "@/services/slices/multi-step-slice/multi-step-slice";
import {
   MultiStepDropdownMenuSubTriggerProps,
   MultiStepDropdownMenuLabelProps,
} from "@/types";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { StoreRootState } from "@/services/store";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { cn } from "@/lib/utils";
import { BsChevronLeft } from "react-icons/bs";
import { Button } from "@/components/ui/button";

export const MultiStepDropdownMenuSubTrigger = ({
   children,
   steps,
   asChild = false,
   onClick,
   ...props
}: MultiStepDropdownMenuSubTriggerProps) => {
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
      onClick;
   };

   return (
      <DropdownMenuTrigger asChild={asChild} onClick={handleClick} {...props}>
         {children}
      </DropdownMenuTrigger>
   );
};

export const MultiStepDropdownMenuLabel = ({
   className,
   hidePreviousButton = false,
   headerTitle,
   headerDescription,
   headerTitleClassName,
   headerDescriptionClassName,
   onPrevClick,
   children,
   ...props
}: MultiStepDropdownMenuLabelProps) => {
   const dispatch = useDispatch();
   const { currentStep, steps } = useSelector(
      (state: StoreRootState) => state.multiStepSlice
   );

   const defaultStep = (steps && steps[0]) || "";
   const shouldShowBackButton =
      currentStep !== defaultStep && !hidePreviousButton;

   return (
      <DropdownMenuLabel
         className={cn("pt-2 px-0 text-start", className)}
         {...props}
      >
         <div
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
         </div>
      </DropdownMenuLabel>
   );
};
