import { RejectedFileProp } from "@/types";
import { Button } from "@/components/ui/button";
import { Cross2Icon } from "@radix-ui/react-icons";
import {
   Tooltip,
   TooltipContent,
   TooltipTrigger,
} from "@/components/ui/tooltip";
import { RxFileText } from "react-icons/rx";

export const RejectedFile = ({ file, errors, onDelete }: RejectedFileProp) => {
   return (
      <li
         key={file.name}
         id="file-card-reject"
         className="group/file-card p-3 grid grid-cols-[30px_1fr_35px] items-center gap-3 border shadow-sm rounded-sm"
      >
         <span className="*:size-[30px]">
            <RxFileText strokeWidth={0.01} />
         </span>

         <div className="line-clamp-4">
            <span className="line-clamp-2">{file.name} </span>

            <ul className="text-sm text-destructive line-clamp-2">
               {errors.map((error, index) => (
                  <li key={index} className="text-md">
                     {error.code}
                  </li>
               ))}
            </ul>
         </div>

         <Tooltip>
            <TooltipTrigger>
               <Button
                  type="button"
                  variant="destructive"
                  onClick={() => onDelete(file.name, "rejected")}
                  className="size-fit p-1.5 transition-all ease-linear duration-100 lg:opacity-0 lg:invisible group-hover/file-card:opacity-100 group-hover/file-card:visible *:size-4"
               >
                  <Cross2Icon />
               </Button>
            </TooltipTrigger>

            <TooltipContent>Remove</TooltipContent>
         </Tooltip>
      </li>
   );
};
