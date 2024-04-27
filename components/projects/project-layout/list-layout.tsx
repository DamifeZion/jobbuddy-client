"use client";
import { DataTable } from "@/components/ui/data-table";
import { ProjectCardProp } from "@/types";
import listCard from "../project-card/card/list-card";
import ProjectBulkAction from "../project-card/options/project-bulk-action";
import { useDispatch, useSelector } from "react-redux";
import { StoreRootState } from "@/services/store";

const ListLayout = ({ projectData }: { projectData: ProjectCardProp[] }) => {
   const dispatch = useDispatch();
   const { selectedProjects } = useSelector(
      (state: StoreRootState) => state.projectSlice
   );

   console.log(selectedProjects);

   return (
      <div>
         <DataTable
            className="border-none"
            columns={listCard({
               projects: projectData,
            })}
            data={projectData}
            tableHeaderClassName="hover:!bg-transparent"
            tableBodyClassName="
               min-h-[60px] transition ease-linear duration-100
            "
            tableBodyRowClassName="group/card cursor-pointer data-[state=selected]:bg-red-600"         tableBodyCellClassName="px-4"
         />

         <ProjectBulkAction project={projectData} />
      </div>
   );
};

export default ListLayout;
