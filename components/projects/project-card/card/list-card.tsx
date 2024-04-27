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

type ActionsProps = {
   projectItem: ProjectCardLayoutProps;
   row: any;
};

//=== DATATABLE NAME COLUMN ===//
const Name = ({ project }: ProjectCardLayoutProps) => {
   return (
      <div
         className="max-w-[400px] grid grid-cols-[70px_1fr] items-center gap-4 
         [&_#file-preview]:size-[70px] [&_#file-preview]:border [&_#file-preview]:rounded-md
         [&_h1]:font-semibold [&_h1]:tracking-wide 
         "
      >
         <div id="file-preview"></div>

         <h1 className="w-full break-all truncate">{project.title}</h1>
      </div>
   );
};

//=== DATATABLE ACTIONS COLUMN ===//
const Actions = ({ projectItem, row }: ActionsProps) => {
   const {project} = projectItem;
   const dispatch = useDispatch();
   const { selectedProjects } = useSelector(
      (state: StoreRootState) => state.projectSlice
   );
   const projectIsChecked = selectedProjects.includes(project.id);
   const hasSelectedProjects = selectedProjects.length;

   return (
      <div id="actions" className="flex items-center gap-4">
         <Checkbox
            id={`project-${project.id}`}
            checked={projectIsChecked}
            onCheckedChange={(value) => {
               row.toggleSelected(!!value);
               dispatch(setSelectedProjects(project.id));
            }}
            aria-label="Select row"
            className={cn(
               "size-8 border-2 border-border bg-background shadow-none rounded-[calc(var(--radius)_-_6px)] checked:border-primary lg:size-7",
               {
                  "lg:invisible lg:opacity-0 lg:group-hover/card:visible lg:group-hover/card:opacity-100":
                     !hasSelectedProjects,
               }
            )}
         />
      </div>
   );
};

const listCard = ({ projects }: ListCardProps) => {
   const thClassName = "text-md font-semibold";

   const columns: ColumnDef<ProjectCardProp>[] = [
      // {
      //    id: "select",
      //    header: ({ table }) => {
      //       return (
      //          <div className="size-full flex items-center">
      //             {/* <Checkbox
      //                checked={
      //                   table.getIsAllPageRowsSelected() ||
      //                   (table.getIsSomePageRowsSelected() && "indeterminate")
      //                }
      //                onCheckedChange={(value) => {
      //                   table.toggleAllPageRowsSelected(!!value);

      //                   //NOTE: If its selected, all projects is checked, then we get the project id and mark all, else we remove.
      //                   if (!!value) {
      //                      const projectIds = projects.map(
      //                         (project) => project.id
      //                      );
      //                      dispatch(markAllProjects(projectIds));
      //                   } else {
      //                      dispatch(clearSelectedProjects());
      //                   }
      //                }}
      //                aria-label="Select all"
      //                className="size-8 shadow-none border-2 border-border rounded-[calc(var(--radius)_-_6px)] checked:border checked:border-primary lg:size-6"
      //             /> */}
      //          </div>
      //       );
      //    },

      //    cell: ({ row }) => {
      //       const project = row.original;

      //       return (
      //          <div className="size-full flex items-center">
      //             <Checkbox
      //                checked={selectedProjects.includes(project.id)}
      //                onCheckedChange={(value) => {
      //                   row.toggleSelected(!!value);
      //                   dispatch(setSelectedProjects(project.id));
      //                }}
      //                aria-label="Select row"
      //                className="size-8 shadow-none border-2 border-border rounded-[calc(var(--radius)_-_6px)] checked:border checked:border-primary lg:size-6"
      //             />
      //          </div>
      //       );
      //    },

      //    enableSorting: true,
      //    enableHiding: false,
      // },

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
         header: "acion",
         cell: ({ row }) => <Actions projectItem={row.original} row={row} />,
      },
   ];

   return columns;
};

export default listCard;
