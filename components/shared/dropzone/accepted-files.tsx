import { RxFileText } from "react-icons/rx";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AcceptedFileProps } from "@/types";
import { cn } from "@/lib/utils";
import {
   Tooltip,
   TooltipContent,
   TooltipTrigger,
} from "@/components/ui/tooltip";
import { Trash } from "lucide-react";

export const AcceptedFile = ({
   file,
   uploadProgress,
   onDelete,
}: AcceptedFileProps) => {
   const fileName = file instanceof File ? file.name : file.original_filename;
   const isUploading =
      file instanceof File &&
      uploadProgress !== undefined &&
      uploadProgress < 100;

   return (
      <div
         id="file-card"
         className="group/file-card p-3 grid grid-cols-[30px_1fr_35px] items-center gap-3 border shadow-sm rounded-sm"
      >
         <span className="*:size-[30px]">
            <RxFileText strokeWidth={0.01} />
         </span>

         <div
            className={cn("line-clamp-2", {
               "space-y-2": isUploading,
            })}
         >
            <span className="text-md line-clamp-1">{fileName}</span>

            {isUploading && <Progress value={uploadProgress} />}
         </div>

         {!isUploading && (
            <Tooltip>
               <TooltipTrigger asChild>
                  <Button
                     type="button"
                     variant="destructive"
                     onClick={() => onDelete(fileName, "accepted")}
                     className="
                           size-fit p-1.5 transition-all ease-linear duration-100 
                           lg:opacity-0 lg:invisible 
                           group-hover/file-card:opacity-100 group-hover/file-card:visible
                           *:size-4
                        "
                  >
                     <Trash />
                  </Button>
               </TooltipTrigger>

               <TooltipContent>Delete</TooltipContent>
            </Tooltip>
         )}

         {isUploading && (
            <span className="size-[35px] flex items-center justify-center bg-primary/80 text-primary-foreground rounded-full text-xsm">
               {uploadProgress}%
            </span>
         )}
      </div>
   );
};
