"use client";
import { useMemo } from "react";
import { DataTable } from "@/components/ui/data-table";
import { ProjectCardProp } from "@/types";
import listColumns from "../project-card/card/list-card-column";
import ProjectBulkAction from "../project-card/options/project-bulk-action";
import { useMediaQuery } from "@mui/material";
import { screenConstants } from "@/constants/screen-const";
import { useSelector } from "react-redux";
import { StoreRootState } from "@/services/redux-provider/store";

const ListLayout = ({ projectData }: { projectData: ProjectCardProp[] }) => {
   const { selectedProjects } = useSelector(
      (state: StoreRootState) => state.projectSlice
   );
   const smMobileScreen = useMediaQuery(
      `(max-width: ${screenConstants.SM_Mobile_Screen_PX})`
   );

   //NOTE: Memoize the columns to avoid infinite re rendering or loop.
   const memoizedColumns = useMemo(
      () => listColumns(smMobileScreen),
      [smMobileScreen]
   );

   /*NOTE:
    *  I hid the checkbox and Main OPtions in the 'listCardColumn' until hover on tableBodyRow.
    *  You must make sure to be careful with the '[&_#cell]' in the tableBodyRowClassName. Its very important that the height is exactly the same as the table row height, and the current layout helps achieve it. TO better understance, add this => "[&_#cell]:border [&_#cell]:border-red-600" to the 'tableBodyCellClassName'.
    *  The reason the '[&_#cell]' height mus tbe exactly the same with the table rows, is because of the handleClick functionality added. Working with the data-table and handling routing and toggling selected, if selected is not really easy, therefore this makes it alot more easier.
    */

   return (
      <div>
         <DataTable
            data={projectData}
            columns={memoizedColumns}
            selectedItems={selectedProjects}
            usePagination={true}
            className="border-none"
            tableHeadRowClassName="hover:bg-transparent"
            tableBodyClassName="h-[70px] transition ease-linear duration-100"
            tableBodyRowClassName="group/card cursor-pointer !rounded-2xl relative data-[state=selected]:bg-muted/40 dark:data-[state=selected]:bg-muted/20"
            tableBodyCellClassName="relative p-0 
            [&_#cell]:min-h-[80px] [&_#cell]:py-2 [&_#cell]:px-2 [&_#cell]:md:px-4 [&:has([role=checkbox])]:px-0"
         />

         <ProjectBulkAction project={projectData} />
      </div>
   );
};

export default ListLayout;
