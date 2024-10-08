"use client";
import { ColumnDef, Row, Table } from "@tanstack/react-table";
import { ProjectCardLayoutProps, ProjectCardProp } from "@/types";
import moment from "moment";
import { Checkbox } from "@/components/ui/checkbox";
import { setSelectedProjects } from "@/services/slices/dashboard/project-slice/projectSlice";
import { useDispatch, useSelector } from "react-redux";
import { StoreRootState } from "@/services/redux-provider/store";
import { cn } from "@/lib/utils";
import MainOptions from "../options/main-options";
import { useHandleProjectCardClick } from "@/hooks/project/useHandleProjectCardClick";
import { Button } from "@/components/ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";

//=== DATATABLE NAME COLUMN ===//
const Name = ({ project }: ProjectCardLayoutProps) => {
   const { handleCardClick } = useHandleProjectCardClick(project); //NOTE: To handle project card clicks

   return (
      <div
         id="cell"
         onClick={handleCardClick}
         className="grid grid-cols-[70px_1fr] items-center gap-4 group
         [&_#file-preview]:size-[70px] [&_#file-preview]:border [&_#file-preview]:border-foreground [&_#file-preview]:rounded-md
         [&_h1]:font-semibold [&_h1]:tracking-wide [&_h1]:truncate [&_h1]:break-all
         "
      >
         <div id="file-preview"></div>

         <h1>{project.title}</h1>
      </div>
   );
};

//=== DATATABLE TYPE COLUMN ===//
const Type = ({ project }: ProjectCardLayoutProps) => {
   const { handleCardClick } = useHandleProjectCardClick(project); //NOTE: To handle project card clicks

   return (
      <div
         id="cell"
         onClick={handleCardClick}
         className="flex items-center [&>p]:capitalize"
      >
         <p>{project.type}</p>
      </div>
   );
};

//=== DATATABLE DATE COLUMN ===//
const Date = ({ project }: ProjectCardLayoutProps) => {
   const { handleCardClick } = useHandleProjectCardClick(project); //NOTE: To handle project card clicks
   const date = project.date as Date;
   const formatDate = moment(date).fromNow();

   return (
      <div
         id="cell"
         onClick={handleCardClick}
         className="flex items-center text-capitalize"
      >
         <p>{formatDate}</p>
      </div>
   );
};

//=== DATATABLE ACTIONS COLUMN ===//
//NOTE: The action column does not need a handleCardClick function, because its an action column with buttons required not to route.
const Actions = ({ project }: ProjectCardLayoutProps) => {
   const { handleCardClick } = useHandleProjectCardClick(project); //NOTE: To handle project card clicks
   const dispatch = useDispatch();
   const { selectedProjects } = useSelector(
      (state: StoreRootState) => state.projectSlice
   );
   const projectIsChecked = selectedProjects.includes(project.id);
   const hasSelectedProjects = selectedProjects.length;

   const handleCheckedChange = () => {
      dispatch(setSelectedProjects(project.id));
   };

   return (
      <div key={project.id} id="actions">
         <div className="flex items-center gap-4 px-2 md:px-4">
            <Checkbox
               id={`project-${project.id}`}
               checked={projectIsChecked}
               onCheckedChange={handleCheckedChange}
               aria-label="Select row"
               className={cn(
                  "size-8 border-2 border-border bg-background shadow-none relative z-[1] checked:border-primary lg:size-7",
                  {
                     "lg:invisible lg:opacity-0 lg:group-hover/card:visible lg:group-hover/card:opacity-100":
                        !hasSelectedProjects,
                  }
               )}
            />

            <MainOptions project={project} />
         </div>

         {/* NOTE: DO NOT REMOVE THE BELOW it handles the routing/toggling/click for this column enhancing overall flow of the table*/}
         <span
            id="route-handler"
            onClick={handleCardClick}
            className="size-full absolute inset-0 z-0 "
         />
      </div>
   );
};

const listColumns = (isSmallScreen: boolean) => {
   //=== Columns For Small Screens ===//
   const smallScreenColumns: ColumnDef<ProjectCardProp>[] = [
      {
         accessorKey: "title",
         header: ({ column }) => (
            <Button
               variant="ghost"
               onClick={() => {
                  column.toggleSorting(column.getIsSorted() === "asc");
               }}
            >
               Name
               <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
         ),
         cell: ({ row }) => <Name project={row.original} />,
      },

      {
         id: "actions",
         header: "",
         cell: ({ row }) => <Actions project={row.original} />,
      },
   ];

   //=== Columns For Larger Screens ===//
   const largeScreenColumns: ColumnDef<ProjectCardProp>[] = [
      {
         accessorKey: "title",
         header: ({ column }) => (
            <Button
               variant="ghost"
               onClick={() => {
                  column.toggleSorting(column.getIsSorted() === "asc");
               }}
            >
               Name
               <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
         ),
         cell: ({ row }) => <Name project={row.original} />,
      },

      {
         accessorKey: "type",
         header: () => <h2>Type</h2>,
         cell: ({ row }) => <Type project={row.original} />,
      },

      {
         accessorKey: "date",
         header: ({ column }) => (
            <Button
               variant="ghost"
               onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
               }
            >
               Edited
               <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
         ),
         cell: ({ row }) => <Date project={row.original} />,
      },

      {
         id: "actions",
         header: "",
         cell: ({ row }) => <Actions project={row.original} />,
      },
   ];

   return isSmallScreen ? smallScreenColumns : largeScreenColumns;
};

export default listColumns;
