"use client";
import { DataTable } from "@/components/ui/data-table";
import { ProjectCardProp } from "@/types";
import listColumns from "../project-card/card/list-card-column";
import ProjectBulkAction from "../project-card/options/project-bulk-action";
import { useMediaQuery } from "@mui/material";
import { screenConstants } from "@/constants/screen-const";
import { routeConstants } from "@/constants/route-const";
import { useSelector } from "react-redux";
import { StoreRootState } from "@/services/store";

const ListLayout = ({ projectData }: { projectData: ProjectCardProp[] }) => {
   const smMobileScreen = useMediaQuery(
      `(max-width: ${screenConstants.SM_Mobile_Screen_PX})`
   );
   const { editProject: editProjectRoute } =
      routeConstants.authRoute.nestedRoute;

   //NOTE: I hid the checkbox and Main OPtions in the 'listCardColumn' until hover on tableBodyRow.

   return (
      <div>
         <DataTable
            href={editProjectRoute}
            className="border-none"
            columns={listColumns(smMobileScreen)}
            data={projectData}
            tableHeaderClassName="hover:!bg-transparent"
            tableBodyClassName="min-h-[60px] transition ease-linear duration-100"
            tableBodyRowClassName="group/card cursor-pointer !rounded-2xl data-[state=selected]:bg-transparent"
            tableBodyCellClassName="px-2 md:px-4"
         />

         <ProjectBulkAction project={projectData} />
      </div>
   );
};

export default ListLayout;
