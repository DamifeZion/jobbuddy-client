import { useDispatch, useSelector } from "react-redux";
import {
   prevStep,
   setCurrentStep,
   setStepTitles,
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

/*NOTE:
 * Multi-Step-Dropdown isnt exactly a dropdown, it will look like a dropdown and feel like one, but its actually just a popover content, this is because this will make the applicationn feel better overall, as dropdown stops body scrolling, but popover allows it. Thats one of the many reasons it was used rather than dropdown.
 */

export const MultiStepDropdownSubMenuTrigger = ({
   children,
   stepTitles,
   steps,
   onClick,
   ...props
}: MultiStepDropdownSubMenuTriggerProps) => {
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
      <button onClick={handleClick} {...props}>
         {children}
      </button>
   );
};

export const MultiStepDropdownHeader = ({
   className,
   hidePreviousButton = false,
   onPrevClick,
   children,
   ...props
}: MultiStepDropdownHeaderProps) => {
   const dispatch = useDispatch();
   const { currentStep, steps, currentTitle } = useSelector(
      (state: StoreRootState) => state.multiStepSlice
   );

   const defaultStep = (steps && steps[0]) || "";
   const shouldShowBackButton =
      currentStep !== defaultStep && !hidePreviousButton;

   return (
      <div
         className={cn(
            "px-4 py-3 w-full grid grid-flow-col items-center text-start text-md text-pretty capitalize font-semibold",
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
   ...props
}: MultiStepDropdownMenuItemProps) => {
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

   const button = (
      <Button
         variant="ghost"
         className={cn(
            "w-full px-4 py-3 justify-start rounded-none",
            className
         )}
         {...props}
      >
         {children}
      </Button>
   );

   switch (routing) {
      case "external":
         return <a href={href}>{button}</a>;
      case "internal":
         return href && <Link href={href}>{button}</Link>;
      default:
         return button;
   }
};
