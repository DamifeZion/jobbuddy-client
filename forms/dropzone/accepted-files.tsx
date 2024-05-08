import { RxFileText } from "react-icons/rx";
import { BiFile } from "react-icons/bi";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Button } from "../form-config";
import { Progress } from "@/components/ui/progress";
import { AcceptedFileProps } from "@/types";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "@/components/ui/tooltip";

export const AcceptedFile = ({
   file,
   uploadProgress,
   onDelete,
}: AcceptedFileProps) => {
   const fileName = file instanceof File ? file.name : file.original_filename;
   const isUploading = file instanceof File && uploadProgress !== undefined && uploadProgress < 100;
   

   return (
      <div
         id="img-preview"
         className={cn(
            "p-3 grid grid-cols-[30px_1fr] items-center gap-3 border shadow-sm rounded-sm",
            {
               "grid-cols-[30px_1fr_35px]": isUploading,
            }
         )}
      >
         <span className="*:size-[30px]">
            <RxFileText strokeWidth={0.01} />
         </span>

         <div
            className={cn({
               "space-y-2": isUploading,
            })}
         >
            <div className="flex items-center gap-1 ">
               <span className="text-md line-clamp-1">{fileName}</span>

               {!isUploading && (
                  <TooltipProvider>
                     <Tooltip>
                        <TooltipTrigger asChild>
                           <Button
                              type="button"
                              size="icon"
                              variant="destructive"
                              onClick={onDelete}
                              className="size-fit p-0.5 rounded-full *:size-3.5"
                           >
                              <Cross2Icon />
                           </Button>
                        </TooltipTrigger>

                        <TooltipContent>Delete</TooltipContent>
                     </Tooltip>
                  </TooltipProvider>
               )}
            </div>

            {isUploading && <Progress value={uploadProgress} />}
         </div>

         {isUploading && (
            <span className="size-[35px] flex items-center justify-center bg-primary/80 text-primary-foreground rounded-full text-xsm">
               {uploadProgress}%
            </span>
         )}
      </div>
   );
};
