import { navbarConstants } from "@/constants/navbar-const";
import { StoreRootState } from "@/services/store";
import { useDispatch, useSelector } from "react-redux";
import { motion, Variants } from "framer-motion";
import { IoTrashOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { CgClose } from "react-icons/cg";
import {
   clearSelectedProjects,
   markAllProjects,
   setSelectedProjects,
} from "@/services/slices/dashboard/project-slice/projectSlice";
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "@/components/ui/tooltip";
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { ProjectBulkActionProps } from "@/types";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const ProjectBulkAction = ({ project }: ProjectBulkActionProps) => {
   const dispatch = useDispatch();
   const { selectedProjects } = useSelector(
      (state: StoreRootState) => state.projectSlice
   );
   /*NOTE: The below makes sure to keep the fixed position width same as the "dashboard main content"... Check dashboard layout for more information*/
   const { mainContentWidth } = useSelector(
      (state: StoreRootState) => state.dashboardMainContentSlice
   );
   /*NOTE: The below will be used to conditionally check the custom checkbox and apply conditional styles*/
   const [isChecked, setIsChecked] = useState(false);
   const projectIds = project.map((project) => String(project.id));

   useEffect(() => {
      if (selectedProjects.length === projectIds.length) {
         setIsChecked(true);
      }
   }, [selectedProjects.length, projectIds.length]);

   const variants: Variants = {
      hidden: {
         y: "100%",
         opacity: 0,
         transition: { ease: "backInOut", duration: 0.3 },
      },
      visible: {
         y: "0%",
         opacity: 1,
         transition: { ease: "backInOut", duration: 0.3 },
      },
   };

   const handleBulkDelete = () => {
      setIsChecked(false);
      alert(
         "Make a post request and delete all the items with the following id's: " +
            JSON.stringify(selectedProjects)
      );
   };

   const handleMarkAll = () => {
      //NOTE: Check if all projects are currently selected
      if (selectedProjects.length === projectIds.length) {
         //NOTE: If they are, clear the selection
         dispatch(clearSelectedProjects());
         setIsChecked(false);
      } else {
         //NOTE: Otherwise, select all projects
         dispatch(markAllProjects(projectIds));
         setIsChecked(true);
      }
   };

   const handleCancel = () => {
      /*NOTE: Firstly reset the selected project to the initial state.
       * Then turn off the isChecked.
       */
      dispatch(clearSelectedProjects());
      setIsChecked(false);
   };

   return (
      /*NOTE:Make sure the "margin-left" applied for large screen devices here is exactly same with that in the dashboard layout for lg and up*/
      <motion.div
         initial="hidden"
         animate={selectedProjects.length > 0 ? "visible" : "hidden"}
         variants={variants}
         style={{
            width: mainContentWidth,
            minHeight: navbarConstants.Mobile_Navbar_Height,
         }}
         className="main-content-margin w-full px-6 py-2 flex items-center justify-between gap-2 fixed bottom-0 left-0 z-30 bg-background border border-border lg:border-l-transparent"
      >
         <span className="text-sm">({selectedProjects.length}) Selected</span>

         <div className="flex items-center gap-4">
            <TooltipProvider>
               <Tooltip>
                  <TooltipTrigger asChild>
                     <Checkbox
                        checked={isChecked}
                        onCheckedChange={handleMarkAll}
                        className={cn(
                           "size-8 rounded-[calc(var(--radius)_-_6px)] shadow-none border-2 border-border hover:border-ring sm:size-7",
                           {
                              "bg-primary text-white border-ring": isChecked,
                           }
                        )}
                     />
                  </TooltipTrigger>

                  <TooltipContent>
                     {selectedProjects.length !== projectIds.length
                        ? "Mark all"
                        : "Unmark all"}
                  </TooltipContent>
               </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
               <Tooltip>
                  <AlertDialog>
                     <AlertDialogTrigger asChild>
                        <TooltipTrigger asChild>
                           <Button
                              size="icon"
                              variant="ghost"
                              className="size-fit p-2"
                           >
                              <IoTrashOutline fontSize={24} />
                           </Button>
                        </TooltipTrigger>
                     </AlertDialogTrigger>

                     <AlertDialogContent>
                        <AlertDialogHeader>
                           <AlertDialogTitle>
                              Move {selectedProjects.length} items to trash?
                           </AlertDialogTitle>

                           <AlertDialogDescription>
                              Item can be restored from trash in the next 30
                              days.
                           </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                           <AlertDialogCancel>Cancel</AlertDialogCancel>

                           <AlertDialogAction
                              onClick={handleBulkDelete}
                              className="bg-destructive text-destructive-foreground"
                           >
                              Move to trash
                           </AlertDialogAction>
                        </AlertDialogFooter>
                     </AlertDialogContent>
                  </AlertDialog>

                  <TooltipContent>Move to trash</TooltipContent>
               </Tooltip>
            </TooltipProvider>
         </div>

         <TooltipProvider>
            <Tooltip>
               <TooltipTrigger asChild>
                  <Button
                     variant="ghost"
                     className="size-fit p-2"
                     onClick={handleCancel}
                  >
                     <CgClose fontSize={24} />
                  </Button>
               </TooltipTrigger>

               <TooltipContent>Cancel</TooltipContent>
            </Tooltip>
         </TooltipProvider>
      </motion.div>
   );
};

export default ProjectBulkAction;
