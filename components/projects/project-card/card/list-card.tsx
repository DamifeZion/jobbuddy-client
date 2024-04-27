"use client";
import { ColumnDef } from "@tanstack/react-table";
import {
   ListCardProps,
   ProjectCardLayoutProps,
   ProjectCardProp,
} from "@/types";
import moment from "moment";
import { Checkbox } from "@/components/ui/checkbox";
import {
   markAllProjects,
   setSelectedProjects,
   clearSelectedProjects,
} from "@/services/slices/dashboard/project-slice/projectSlice";
import { useDispatch, useSelector } from "react-redux";
import { StoreRootState } from "@/services/store";
import { cn } from "@/lib/utils";
import { useCallback, useEffect } from "react";
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

   /*NOTE:
    * When the user first checks, we first update the data table check state,
    * Then we dispatch the project.id to the store to show the bulk action option at the bottom
    * Lastly we call the function handleCheckedChange in the useEffect, passing the hasClearedSelectedProject as true, so when the project.id is removed from the store, the data table is also synced and aware of the changes, therefore unchecks all projects.
    */
   const handleCheckedChange = useCallback(
      (value: boolean, hasClearedSelectedProjects?: boolean) => {
         row.toggleSelected(!!value);
         dispatch(setSelectedProjects(project.id));

         if (hasClearedSelectedProjects) {
            row.toggleSelected(false);
         }
      },
      [dispatch, project.id, row]
   );

   useEffect(() => {
      /*NOTE:
       * If the project is not in the selectedProjects and the row is currently checked, we uncheck it.
       * This helps handlemark all function to falsy check the list-layout projectBulkAction
       */
      if (!projectIsChecked && row.getIsSelected() === true) {
         handleCheckedChange(projectIsChecked, true);
      }
      /*NOTE:
       * If the project is in the selectedProjects and the row is currently unChecked, we check it.
       * This helps handlemark all function to truthy check the list-layout projectBulkAction
       */
      if (projectIsChecked && row.getIsSelected() === false) {
         handleCheckedChange(projectIsChecked);
      }
   }, [handleCheckedChange, projectIsChecked, row]);

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

const listCard = ({ projects }: ListCardProps) => {
   const thClassName = "max-lg:hidden text-md font-semibold";

   const columns: ColumnDef<ProjectCardProp>[] = [
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

            return <h1>{formatDate}</h1>;
         },
      },

      {
         id: "actions",
         header: "",
         cell: ({ row }) => <Actions project={row.original} row={row} />,
      },
   ];

   return columns;
};

export default listCard;
