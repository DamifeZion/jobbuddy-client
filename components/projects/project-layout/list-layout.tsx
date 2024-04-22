import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ListCard from "../project-card/card/list-card";
import { projectConstants } from "@/constants/project-const";
import { CaretSortIcon } from "@radix-ui/react-icons";

const ListLayout = () => {
   const { projectItem } = projectConstants;

   return (
      <Table>
         <TableHeader>
               <TableRow className="text-md [&th>span]:flex [&th>span]:items-center">
                  <TableHead className="w-2/5">Name</TableHead>
                  <TableHead>By</TableHead>
                  <TableHead>Edited</TableHead>
               </TableRow>
         </TableHeader>

         <TableBody>
            {projectItem.map((data, index) => {
               return <ListCard key={index} project={data} />
            })}
         </TableBody>
      </Table>
   );
};

export default ListLayout;
