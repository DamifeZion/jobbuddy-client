import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import { ProjectCardLayoutProps } from "@/types";
import BulletPoint from "@/components/shared/bullet-point/bullet-point";
import { MdOutlineModeEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { StoreRootState } from "@/services/store";
import { Button } from "@/components/ui/button";
import moment from "moment";
import RenameFileForm from "@/app/forms/dashboard/project/rename-file-form";
import { useIsLoading } from "@/hooks/shared/useIsLoading";

const DefaultHeader = () => {
   const { user } = useSelector((state: StoreRootState) => state.userSlice);
   const { activeProject } = useSelector(
      (state: StoreRootState) => state.projectSlice
   );

   //NOTE: The below will disable the dialog from closing if loading anywhere.
   const { isOpen, handleOpenChange } = useIsLoading();

   return (
      <div className="grid grid-cols-1">
         <Dialog open={isOpen} onOpenChange={handleOpenChange} modal>
            <DialogTrigger asChild>
               <div className="w-full flex items-center gap-1 text-lg leading-[1.8]">
                  <h1 className="max-w-[90%] truncate">
                     {activeProject.title}
                  </h1>

                  <Button
                     size="icon"
                     variant="ghost"
                     className="size-fit p-0 rounded-full hover:bg-transparent"
                  >
                     <MdOutlineModeEdit className="max-sm:mb-1 size-6" />
                  </Button>
               </div>
            </DialogTrigger>

            <DialogContent className="max-w-sm">
               <DialogHeader>
                  <DialogTitle>Rename file</DialogTitle>
                  <DialogDescription>
                     Enter a new name for your file.
                  </DialogDescription>
               </DialogHeader>

               <div id="form-wrapper" className="">
                  <RenameFileForm />
               </div>
            </DialogContent>
         </Dialog>

         <ul className="flex line-clamp-1 sm:line-clamp-none sm:grid sm:grid-cols-[100px_1fr] gap-1 items-center text-[13px] font-normal text-muted-foreground *:truncate">
            <li>By {user?.name}</li>

            <BulletPoint bulletPointClassName="bg-muted-foreground">
               Edited {moment(activeProject.date).fromNow()}
            </BulletPoint>
         </ul>
      </div>
   );
};

export default DefaultHeader;
