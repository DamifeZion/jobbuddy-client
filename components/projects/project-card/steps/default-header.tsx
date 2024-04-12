import React from "react";
import {
   Dialog,
   DialogClose,
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
import RenameFileForm from "@/forms/dashboard/project/rename-file-form";

const DefaultHeader = ({ project }: ProjectCardLayoutProps) => {
   const { user } = useSelector((state: StoreRootState) => state.userSlice);

   return (
      <div className="grid grid-cols-1">
         <Dialog>
            <DialogTrigger asChild>
               <div className="w-full flex items-center gap-1 text-lg leading-[1.8]">
                  <h1 className="max-w-[90%] truncate">{project.title}</h1>

                  <Button
                     size="icon"
                     variant="ghost"
                     className="size-fit p-0 rounded-full hover:bg-transparent"
                  >
                     <MdOutlineModeEdit className="size-6" />
                  </Button>
               </div>
            </DialogTrigger>

            <DialogContent className="max-w-sm">
               <DialogClose />

               <DialogHeader>
                  <DialogTitle>Rename file</DialogTitle>
                  <DialogDescription>
                     Enter a new name for your file.
                  </DialogDescription>
               </DialogHeader>

               <div id="form-wrapper" className="">
                  <RenameFileForm project={project} />
               </div>
            </DialogContent>
         </Dialog>

         <ul className="grid grid-cols-[100px_1fr] gap-1 items-center text-[13px] font-normal text-muted-foreground *:truncate">
            <li>By {user?.name}</li>

            <BulletPoint bulletPointClassName="bg-muted-foreground">
               Edited {moment(project.date).fromNow()}
            </BulletPoint>
         </ul>
      </div>
   );
};

export default DefaultHeader;
