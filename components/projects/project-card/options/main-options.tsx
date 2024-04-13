//NOTE: Some named groups are not in this file but in the parent file which is grid-card and list-card
"use client";
import { FiDownload } from "react-icons/fi";
import { HiOutlineExternalLink } from "react-icons/hi";
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

const MainOptions = ({ project }: mainOptionProps) => {
   const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
   const { selectedProjects } = useSelector(
      (state: StoreRootState) => state.projectSlice
   );
   const { currentStep } = useSelector((state: StoreRootState) => state.multiStepSlice);
   const smMobileScreen = useMediaQuery(
      `(max-width: ${screenConstants.SM_Mobile_Screen_PX})`
   );
   const { projectItemOptionsSteps: {downloadStep}} = stepConstants.project;

   const renderCurrentStepComponent = () => {
      switch (currentStep) {
         case downloadStep[0]:
            return <h1>Hello</h1>

         default:
            return <DefaultStep project={project} />
      }
   }


   //=== SM MOBILE SCREEN (640px) ===//
   if (smMobileScreen) {
      return <MobileMainOptions />;
   }

   //=== LARGER SCREEN ===//
   return (
      <Popover
         open={dropdownOpen}
         onOpenChange={(open) => {
            setDropdownOpen(open);
         }}
      >
         <PopoverTrigger asChild>
            <Button
               size="icon"
               variant="outline"
               className={cn(
                  "group/options size-7 !m-0 bg-background z-[1] rounded-[calc(var(--radius)_-_6px)] text-foreground  hover:bg-primary lg:invisible lg:opacity-0 lg:group-hover/card:visible lg:group-hover/card:opacity-100",
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
               <DefaultHeader project={project} />
            </MultiStepDropdownHeader>

            <Separator />

            <div className="py-1.5 flex flex-col *:px-4">
               {renderCurrentStepComponent()}
            </div>
         </MultiStepDropdownContent>
      </Popover>
   );
};

export default MainOptions;
