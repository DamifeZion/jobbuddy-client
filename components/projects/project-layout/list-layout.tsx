"use client";
import { DataTable } from "@/components/ui/data-table";
import { ProjectCardLayoutProps, ProjectCardProp } from "@/types";
import listCard from "../project-card/card/list-card";

const ListLayout = ({ projectData }: { projectData: ProjectCardProp[] }) => {
   return (
      <div>
         <DataTable className="border-none" columns={listCard} data={projectData} />
      </div>
   );
};

export default ListLayout;
