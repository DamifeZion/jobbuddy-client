import {
   MultiStepDrawer,
   MultiStepDrawerContent,
   MultiStepDrawerHeader,
} from "@/components/shared/multi-step/multi-step-drawer";
import { Button } from "@/components/ui/button";
import { DrawerTrigger } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import DefaultHeader from "../../default-header";
import { ProjectCardLayoutProps } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { StoreRootState } from "@/services/store";
import { setActiveProject } from "@/services/slices/dashboard/project-slice/projectSlice";
import DownloadStep from "../../steps/download-step";
import DefaultStep from "../../steps/default-step";
import { stepConstants } from "@/constants/step-const";
import { resetSteps } from "@/services/slices/multi-step-slice/multi-step-slice";

const MobileMainOptions = ({ project }: ProjectCardLayoutProps) => {
   const dispatch = useDispatch();
   const { selectedProjects } = useSelector(
      (state: StoreRootState) => state.projectSlice
   );
   const { currentStep } = useSelector(
      (state: StoreRootState) => state.multiStepSlice
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

   return (
      <MultiStepDrawer onOpenChange={(open) => !open && dispatch(resetSteps())}>
         <DrawerTrigger asChild>
            <Button
               size="icon"
               variant="outline"
               onClick={() =>
                  dispatch(
                     setActiveProject({
                        ...project,
                        date: project.date.toISOString(),
                     })
                  )
               }
               className={cn(
                  "group/options size-8 !m-0 bg-background z-[1] rounded-[calc(var(--radius)_-_6px)] hover:bg-primary",
                  {
                     "opacity-0 invisible transition-opacity ease-linear duration-100":
                        selectedProjects.length > 0,
                  }
               )}
            >
               <BiDotsHorizontalRounded className="text-foreground size-5/6 group-hover/options:text-white lg:size-5/6" />
            </Button>
         </DrawerTrigger>

         <MultiStepDrawerContent showLine={true}>
            <MultiStepDrawerHeader
               navigationType="nested"
               header={<DefaultHeader />}
            />

            <div className="pt-2 *:py-6">{renderCurrentStepComponent()}</div>
         </MultiStepDrawerContent>
      </MultiStepDrawer>
   );
};

export default MobileMainOptions;
