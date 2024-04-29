"use client";
import { DataTable } from "@/components/ui/data-table";
import { ProjectCardProp } from "@/types";
import listColumns from "../project-card/card/list-card-column";
import ProjectBulkAction from "../project-card/options/project-bulk-action";
import { useMediaQuery } from "@mui/material";
import { screenConstants } from "@/constants/screen-const";
import { useState, useEffect } from "react";

const ListLayout = ({ projectData }: { projectData: ProjectCardProp[] }) => {
   const smMobileScreen = useMediaQuery(
      `(max-width: ${screenConstants.SM_Mobile_Screen_PX})`
   );

   return (
      <div>
         <DataTable
            className="border-none"
            columns={listColumns({ isSmallScreen: smMobileScreen })}
            data={projectData}
            tableHeaderClassName="hover:!bg-transparent"
            tableBodyClassName="
               min-h-[60px] transition ease-linear duration-100
            "
            tableBodyRowClassName="group/card cursor-pointer overflow-hidden !rounded-2xl hover:bg-muted/50 
            data-[state=selected]:bg-transparent data-[redux-state=selected]:bg-muted/50"
            tableBodyCellClassName="px-4"
         />

         <ProjectBulkAction project={projectData} />
      </div>
   );
};

export default ListLayout;
