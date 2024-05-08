import { RejectedFileProp } from "@/types";
import { Button } from "../form-config";

export const RejectedFile = ({
   file,
   errors,
   onDelete,
}: RejectedFileProp) => {
   return  (
      <li
         key={file.name}
         id="img-preview"
         className="flex flex-wrap gap-4 justify-between"
      >
         <div className="max-400:w-full">
            <p className="text-muted-foreground font-medium">{file.name}</p>

            <ul className="text-sm text-destructive">
               {errors.map((error, index) => (
                  <li key={index}> {error.message} </li>
               ))}
            </ul>
         </div>

         <Button
            variant="destructive"
            type="button"
            onClick={() => onDelete(file.name, "rejected")}
         >
            Remove
         </Button>
      </li>
   );
};
