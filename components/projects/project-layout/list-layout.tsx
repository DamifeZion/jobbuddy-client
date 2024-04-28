"use client";
import { DataTable } from "@/components/ui/data-table";
import { ProjectCardProp } from "@/types";
import listCard from "../project-card/card/list-card";
import ProjectBulkAction from "../project-card/options/project-bulk-action";
import { useDispatch, useSelector } from "react-redux";
import { StoreRootState } from "@/services/store";
import { useMediaQuery } from "@mui/material";
import { screenConstants } from "@/constants/screen-const";

const ListLayout = ({ projectData }: { projectData: ProjectCardProp[] }) => {
   const dispatch = useDispatch();
   const { selectedProjects } = useSelector(
      (state: StoreRootState) => state.projectSlice
   );
   const smMobileScreen = useMediaQuery(
      `(max-width: ${screenConstants.SM_Mobile_Screen_PX})`
   );

   console.log(selectedProjects);

   return (
      <div>
         <DataTable
            className="border-none"
            columns={listCard({
               projects: projectData,
               smMobileScreen,
            })}
            data={projectData}
            tableHeaderClassName="hover:!bg-transparent"
            tableBodyClassName="
               min-h-[60px] transition ease-linear duration-100
            "
            tableBodyRowClassName="group/card cursor-pointer overflow-hidden !rounded-2xl hover:bg-muted/50 
            data-[state=selected]:bg-muted/50 data-[state=selected]:border data-[state=selected]:border-ring"
            tableBodyCellClassName="px-4"
         />

         <ProjectBulkAction project={projectData} />
      </div>
   );
};

export default ListLayout;
