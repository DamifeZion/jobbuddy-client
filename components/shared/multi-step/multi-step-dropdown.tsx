import { useDispatch, useSelector } from "react-redux";
import {
   prevStep,
   resetSteps,
   setCurrentStep,
   setSteps,
} from "@/services/slices/multi-step-slice/multi-step-slice";
import {
   MultiStepDropdownSubMenuTriggerProps,
   MultiStepDropdownHeaderProps,
   MultiStepDropdownContentProps,
   MultiStepDropdownMenuItemProps,
} from "@/types";
import { StoreRootState } from "@/services/store";
import { cn } from "@/lib/utils";
import { BsChevronLeft } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { PopoverContent } from "@/components/ui/popover";
import Link from "next/link";
import { useRouter } from "next/navigation";

/*NOTE:
 * Multi-Step-Dropdown isnt exactly a dropdown, it will look like a dropdown and feel like one, but its actually just a popover content, this is because this will make the applicationn feel better overall, as dropdown stops body scrolling, but popover allows it. Thats one of the many reasons it was used rather than dropdown.
 */

export const MultiStepDropdownSubMenuTrigger = ({
   children,
   steps,
   onClick,
   className,
   ...props
}: MultiStepDropdownSubMenuTriggerProps) => {
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
      <Button
         variant="ghost"
         onClick={handleClick}
         className={cn(
            "w-full h-8 py-5 flex justify-start gap-2 rounded-none",
            className
         )}
      >
         {children}
      </Button>
   );
};

export const MultiStepDropdownHeader = ({
   className,
   hidePreviousButton = false,
   dynamicStepTitle = true,
   onPrevClick,
   children,
   ...props
}: MultiStepDropdownHeaderProps) => {
   const dispatch = useDispatch();
   const { currentStep, steps } = useSelector(
      (state: StoreRootState) => state.multiStepSlice
   );
   const shouldShowBackButton = currentStep && !hidePreviousButton;

   const handlePrevClick = () => {
      onPrevClick;
      if (currentStep !== steps[0]) {
         return dispatch(prevStep());
      } else {
         dispatch(resetSteps());
      }
   };

   return (
      <div
         className={cn(
            "px-4 py-3 w-full flex items-center text-start text-lg text-pretty font-semibold",
            className,
            {
               "grid-cols-[36px_1fr] gap-2": shouldShowBackButton,
            }
         )}
         {...props}
      >
         {shouldShowBackButton && (
            <Button variant="ghost" size="icon" onClick={handlePrevClick}>
               <BsChevronLeft className="size-5" strokeWidth={0.5} />
            </Button>
         )}

         {/*NOTE: If dynamicStepTitle is on and there is current step we show it. */}
         {dynamicStepTitle && currentStep}

         {/*NOTE: If dynamicStepTitle is on and there is no current step we show the children. */}
         {dynamicStepTitle && !currentStep && children}
      </div>
   );
};

export const MultiStepDropdownContent = ({
   children,
   className,
   ...props
}: MultiStepDropdownContentProps) => {
   return (
      <PopoverContent className={cn("p-0 mr-2", className)} {...props}>
         {children}
      </PopoverContent>
   );
};

export const MultiStepDropdownMenuItem = ({
   className,
   children,
   href,
   routing,
   target,
   onClick,
   ...props
}: MultiStepDropdownMenuItemProps) => {
   const router = useRouter();

   if (href && !routing) {
      throw new Error(
         "The 'routing' prop must be specified when 'href' is provided. Please specify whether the routing is 'internal' or 'external'."
      );
   } else if (!href && routing) {
      throw new Error(
         "The 'href' prop must be specified when 'routing' is provided. Please provide a valid 'href'."
      );
   } else if (
      href &&
      routing &&
      routing !== "internal" &&
      routing !== "external"
   ) {
      throw new Error(
         "Invalid 'routing' prop. Please specify whether the routing is 'internal' or 'external'."
      );
   }

   const handleClick = (event: MouseEvent) => {
      onClick(event);

      if (routing === "external") {
         window.open(href, target);
      } else if (routing === "internal") {
         router.push(href as string);
      }
   };

   return (
      <Button
         variant="ghost"
         className={cn(
            "w-full h-8 py-5 flex justify-start gap-2 rounded-none",
            className
         )}
         onClick={handleClick}
         {...props}
      >
         {children}
      </Button>
   );
};
