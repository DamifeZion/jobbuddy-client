import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";
import { ProjectCardLayoutProps } from "@/types";

const ListCard = ({ project }: ProjectCardLayoutProps) => {
   

   return (
      <TableRow key={project.id} className="h-[100px] text-sm *:h-full *:p-4 [&_td]:cursor-pointer [&_td_h1]:font-semibold [&_td_h1]:tracking-wide">
         <TableCell className="flex items-center gap-3">
            <div id="resume-preview" className="w-16 h-full rounded-lg border border-destructive">

            </div>

            <h1>
               {project.title}
            </h1>
         </TableCell>

         <TableCell>
            <h1>{project.id}</h1>
         </TableCell>

         <TableCell>Edited</TableCell>
         <TableCell>
            <Checkbox />
         </TableCell>
      </TableRow>
   );
};

export default ListCard;
