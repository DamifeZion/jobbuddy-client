"use client";
import { ColumnDef, Row } from "@tanstack/react-table";
import { ProjectCardLayoutProps, ProjectCardProp } from "@/types";
import moment from "moment";
import { Checkbox } from "@/components/ui/checkbox";
import {
   setActiveProject,
   setSelectedProjects,
} from "@/services/slices/dashboard/project-slice/projectSlice";
import { useDispatch, useSelector } from "react-redux";
import { StoreRootState } from "@/services/store";
import { cn } from "@/lib/utils";
import MainOptions from "../options/main-options";

//=== DATATABLE NAME COLUMN ===//
const Name = ({ project }: ProjectCardLayoutProps) => {
   return (
      <div
         className="grid grid-cols-[70px_1fr] items-center gap-4 
         [&_#file-preview]:size-[70px] [&_#file-preview]:border [&_#file-preview]:rounded-md
         [&_h1]:font-semibold [&_h1]:tracking-wide 
         "
      >
         <div id="file-preview"></div>

         <h1 className="w-full break-all truncate">{project.title}</h1>
      </div>
   );
};

type ActionsProps = { project: ProjectCardProp; row: any };

//=== DATATABLE ACTIONS COLUMN ===//
const Actions = ({ project, row }: ActionsProps) => {
   const dispatch = useDispatch();
   const { selectedProjects } = useSelector(
      (state: StoreRootState) => state.projectSlice
   );
   const projectIsChecked = selectedProjects.includes(project.id);
   const hasSelectedProjects = selectedProjects.length;

   const handleCheckedChange = (value: boolean) => {
      row.toggleSelected(!!value);
      dispatch(setSelectedProjects(project.id));
      const unSerializedDate = row.original.date as Date;

      dispatch(
         setActiveProject({
            ...row.original,
            date: unSerializedDate.toISOString(),
         })
      );
   };

   return (
      <div id="actions" className="flex items-center gap-4">
         <Checkbox
            id={`project-${project.id}`}
            checked={projectIsChecked}
            onCheckedChange={handleCheckedChange}
            aria-label="Select row"
            className={cn(
               "size-8 border-2 border-border bg-background shadow-none rounded-[calc(var(--radius)_-_6px)] checked:border-primary lg:size-7",
               {
                  "lg:invisible lg:opacity-0 lg:group-hover/card:visible lg:group-hover/card:opacity-100":
                     !hasSelectedProjects,
               }
            )}
         />

         <MainOptions project={project} />
      </div>
   );
};

const thClassName = "max-lg:hidden text-md font-semibold";

interface ListColumnProps {
   isSmallScreen: boolean;
}

const listColumns = ({ isSmallScreen }: ListColumnProps) => {
   //=== Columns For Small Screens ===//
   const smallScreenColumns: ColumnDef<ProjectCardProp>[] = [
      {
         accessorKey: "title",
         header: () => <h2 className={thClassName}>Name</h2>,
         cell: ({ row }) => <Name project={row.original} />,
      },

      {
         id: "actions",
         header: "",
         cell: ({ row }) => <Actions project={row.original} row={row} />,
      },
   ];

   //=== Columns For Larger Screens ===//
   const largeScreenColumns: ColumnDef<ProjectCardProp>[] = [
      {
         accessorKey: "title",
         header: () => <h2 className={thClassName}>Name</h2>,
         cell: ({ row }) => <Name project={row.original} />,
      },

      {
         accessorKey: "type",
         header: () => <h2 className={thClassName}>Type</h2>,
         cell: ({ row }) => (
            <p className="text- capitalize"> {row.original.type} </p>
         ),
      },

      {
         accessorKey: "date",
         header: () => <h2 className={thClassName}>Edited</h2>,
         cell: ({ row }) => {
            const date = row.getValue("date") as Date;
            const formatDate = moment(date).fromNow();

            return <p>{formatDate}</p>;
         },
      },

      {
         id: "actions",
         header: "",
         cell: ({ row }) => <Actions project={row.original} row={row} />,
      },
   ];

   return isSmallScreen ? smallScreenColumns : largeScreenColumns;
};

export default listColumns;
