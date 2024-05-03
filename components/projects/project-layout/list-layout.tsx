"use client";
import { DataTable } from "@/components/ui/data-table";
import { ProjectCardProp } from "@/types";
import listColumns from "../project-card/card/list-card-column";
import ProjectBulkAction from "../project-card/options/project-bulk-action";
import { useMediaQuery } from "@mui/material";
import { screenConstants } from "@/constants/screen-const";
import { useSelector } from "react-redux";
import { StoreRootState } from "@/services/store";

const ListLayout = ({ projectData }: { projectData: ProjectCardProp[] }) => {
   const { selectedProjects } = useSelector(
      (state: StoreRootState) => state.projectSlice
   );
   const smMobileScreen = useMediaQuery(
      `(max-width: ${screenConstants.SM_Mobile_Screen_PX})`
   );

   //NOTE: I hid the checkbox and Main OPtions in the 'listCardColumn' until hover on tableBodyRow.

   return (
      <div>
         <DataTable
            className="border-none"
            data={projectData}
            selectedItems={selectedProjects}
            columns={listColumns(smMobileScreen)}
            tableHeaderClassName="hover:!bg-transparent"
            tableBodyClassName="min-h-[60px] transition ease-linear duration-100"
            tableBodyRowClassName="group/card cursor-pointer !rounded-2xl relative data-[state=selected]:bg-muted/30"
            tableBodyCellClassName="px-2 relative [&:has([role=checkbox])]:px-0 md:px-4"
         />
         
         <ProjectBulkAction project={projectData} />
      </div>
   );
};

export default ListLayout;
