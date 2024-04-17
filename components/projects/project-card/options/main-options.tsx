//NOTE: Some named groups are not in this file but in the parent file which is grid-card and list-card
"use client";
import { screenConstants } from "@/constants/screen-const";
import { useMediaQuery } from "@mui/material";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { cn } from "@/lib/utils";
import { useSelector, useDispatch } from "react-redux";
import { StoreRootState } from "@/services/store";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { mainOptionProps } from "@/types";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import {
   MultiStepDropdownContent,
   MultiStepDropdownHeader,
} from "@/components/shared/multi-step/multi-step-dropdown";
import DefaultHeader from "../default-header/default-header";
import MobileMainOptions from "./mobile/mobile-main-options";
import { stepConstants } from "@/constants/step-const";
import DefaultStep from "../steps/default-step";
import DownloadStep from "../steps/download-step";
import { resetSteps } from "@/services/slices/multi-step-slice/multi-step-slice";
import { setActiveProject } from "@/services/slices/dashboard/project-slice/projectSlice";

const MainOptions = ({ project }: mainOptionProps) => {
   const dispatch = useDispatch();
   const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
   const { selectedProjects } = useSelector(
      (state: StoreRootState) => state.projectSlice
   );
   const { currentStep } = useSelector(
      (state: StoreRootState) => state.multiStepSlice
   );

   const mobileScreen = useMediaQuery(
      `(max-width: ${screenConstants.Mobile_Screen_PX})`
   );
   const {
      projectItemOptionsSteps: { downloadStep },
   } = stepConstants.project;

   const renderCurrentStepComponent = () => {
      switch (currentStep) {
         case downloadStep[0]:
            return <DownloadStep />;

         default:
            return <DefaultStep />;
      }
   };

   //=== SM MOBILE SCREEN (640px) ===//
   if (mobileScreen) {
      // NOTE: There is a different button in mobile, so the actual project needs to be passed, not the one from slice, as it will be empty otherwise.
      return <MobileMainOptions project={project} />;
   }

   //=== LARGER SCREEN ===//
   return (
      <Popover
         open={dropdownOpen}
         onOpenChange={(open) => {
            setDropdownOpen(open);
            //NOTE: Store the active selected project to use globally. Store the date in serialized string format, to avoid redux error.
            dispatch(
               setActiveProject({
                  ...project,
                  date: project.date.toISOString(),
               })
            );
            !open && dispatch(resetSteps()); //NOTE: Reset the step when the popover is closed.
         }}
      >
         <PopoverTrigger asChild>
            <Button
               size="icon"
               variant="outline"
               className={cn(
                  "group/options size-8 !m-0 bg-background z-[1] rounded-[calc(var(--radius)_-_6px)] text-foreground  hover:bg-primary lg:invisible lg:opacity-0 lg:group-hover/card:visible lg:group-hover/card:opacity-100 sm:!size-8",
                  {
                     "lg:group-hover/card:invisible lg:group-hover/card:opacity-0":
                        selectedProjects.length > 0,
                     "lg:visible lg:opacity-100 bg-primary text-white":
                        dropdownOpen,
                  }
               )}
            >
               <BiDotsHorizontalRounded className="size-5/6 group-hover/options:text-white lg:size-5/6" />
            </Button>
         </PopoverTrigger>

         <MultiStepDropdownContent align="start" className="w-[280px]">
            <MultiStepDropdownHeader>
               <DefaultHeader />
            </MultiStepDropdownHeader>

            <Separator />

            <div className="py-1.5 flex flex-col">
               {renderCurrentStepComponent()}
            </div>
         </MultiStepDropdownContent>
      </Popover>
   );
};

export default MainOptions;
