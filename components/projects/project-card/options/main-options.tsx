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
   MultiStepDropdownMenuItem,
} from "@/components/shared/multi-step/multi-step-dropdown";
import DefaultHeader from "../steps/default-header";
import MobileMainOptions from "./mobile/mobile-main-options";

const MainOptions = ({ project }: mainOptionProps) => {
   const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
   const { selectedProjects } = useSelector(
      (state: StoreRootState) => state.projectSlice
   );
   const smMobileScreen = useMediaQuery(
      `(max-width: ${screenConstants.SM_Mobile_Screen_PX})`
   );
   const hasSelectedProjects = selectedProjects.length > 0;

   //NOTE: Some named groups are not in this file but in the parent file which is grid-card and list-card

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
                  "group/options size-6 !m-0 bg-background z-[1] rounded-[calc(var(--radius)_-_6px)] text-foreground  hover:bg-primary sm:size-7 lg:invisible lg:opacity-0 lg:group-hover/card:visible lg:group-hover/card:opacity-100",
                  {
                     "lg:group-hover/card:invisible lg:group-hover/card:opacity-0":
                        hasSelectedProjects,
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

            <div className="py-1.5">
               <MultiStepDropdownMenuItem>Hello</MultiStepDropdownMenuItem>
            </div>
         </MultiStepDropdownContent>
      </Popover>
   );
};

export default MainOptions;
