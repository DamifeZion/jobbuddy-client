//NOTE: Some named groups are not in this file but in the parent file which is grid-card and list-card
"use client";
import { screenConstants } from "@/constants/screen-const";
import { useMediaQuery } from "@mui/material";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { cn } from "@/lib/utils";
import { useSelector, useDispatch } from "react-redux";
import { StoreRootState } from "@/services/redux-provider/store";
import { Button } from "@/components/ui/button";
import { MainOptionProps } from "@/types";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import {
   MultiStepDropdownContent,
   MultiStepDropdownHeader,
} from "@/components/shared/multi-step/multi-step-dropdown";
import DefaultHeader from "../default-header";
import MobileMainOptions from "./mobile/mobile-main-options";
import { stepConstants } from "@/constants/step-const";
import DefaultStep from "../steps/default-step";
import DownloadStep from "../steps/download-step";
import { resetSteps } from "@/services/slices/multi-step-slice/multi-step-slice";
import { setActiveProject } from "@/services/slices/dashboard/project-slice/projectSlice";

const MainOptions = ({ project }: MainOptionProps) => {
   const dispatch = useDispatch();
   const { selectedProjects, activeProject } = useSelector(
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

   const projectIsActive = activeProject.id === project.id;

   const handleOpenChange = (open: boolean) => {
      if (open) {
         dispatch(
            setActiveProject({ ...project, date: project.date.toISOString() })
         );
      } else {
         dispatch(setActiveProject("reset"));
         dispatch(resetSteps());
      }
   };

   const renderStepBodyComponent = () => {
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
      <Popover onOpenChange={handleOpenChange}>
         <PopoverTrigger asChild>
            <Button
               type="button"
               size="icon"
               variant="outline"
               className={cn(
                  "group/options size-8 !m-0 bg-background z-[1] text-foreground hover:bg-primary lg:size-7 lg:invisible lg:opacity-0 lg:group-hover/card:visible lg:group-hover/card:opacity-100",
                  {
                     "z-0 lg:group-hover/card:invisible lg:group-hover/card:opacity-0":
                        selectedProjects.length > 0,
                     "lg:visible lg:opacity-100 bg-primary text-white":
                        projectIsActive,
                  }
               )}
            >
               <BiDotsHorizontalRounded className="size-5/6 group-hover/options:text-white lg:size-5/6" />
            </Button>
         </PopoverTrigger>

         <MultiStepDropdownContent align="start" className="w-[300px]">
            <MultiStepDropdownHeader>
               <DefaultHeader />
            </MultiStepDropdownHeader>

            <Separator />

            <div className="py-1.5 flex flex-col">
               {renderStepBodyComponent()}
            </div>
         </MultiStepDropdownContent>
      </Popover>
   );
};

export default MainOptions;
