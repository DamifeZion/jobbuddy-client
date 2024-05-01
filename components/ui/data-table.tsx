"use client";

import {
   Row,
   flexRender,
   getCoreRowModel,
   useReactTable,
} from "@tanstack/react-table";

import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { DataTableProps } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreRootState } from "@/services/store";
import { setRowIsSelected } from "@/services/slices/custom-ui-slice/data-table-slice";

export function DataTable<TData, TValue>({
   columns,
   data,
   className,
   tableBodyCellClassName,
   tableBodyClassName,
   tableBodyRowClassName,
   tableHeadClassName,
   tableHeadRowClassName,
   tableHeaderClassName,
   href,
   onClick,
   onSelect,
}: DataTableProps<TData, TValue>) {
   const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
   });
   const router = useRouter();

   const { disableRouting } = useSelector(
      (state: StoreRootState) => state.dataTableSlice
   );

   const [rowIsSelected, setRowIsSelected] = useState<
      boolean | ((prevState?: boolean) => void)
   >(false);

   const redirectToItem = (rowData: Row<TData>) => {
      if (href && !rowIsSelected && !disableRouting) {
         const { id } = rowData.original as { id: string };
         const itemRoute = href.includes(":id")
            ? href.replace(":id", id)
            : href;
         return router.push(itemRoute);
      }
   };

   const handleTableRowClick = (
      rowData: Row<TData>,
      event: React.MouseEvent<HTMLTableRowElement>
   ) => {
      onClick && onClick(event); // Optional click event

      //NOTE: It all must be in this function for it to be syncronous, else serious errors
      setRowIsSelected(() => {
         const newSelectedState = table.getIsSomeRowsSelected();

         if (newSelectedState || rowData.getIsSelected()) {
            onSelect && onSelect(event); // Optional event if table is selected
         }

         // Redirect to view if no row is selected in the table
         if (!newSelectedState) {
            redirectToItem(rowData);
         }

         return newSelectedState;
      });
   };

   return (
      <div className={cn("rounded-md border", className)}>
         <Table>
            <TableHeader
               className={cn("h-fit items-center", { tableHeaderClassName })}
            >
               {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow
                     key={headerGroup.id}
                     className={cn(tableHeadRowClassName)}
                  >
                     {headerGroup.headers.map((header) => {
                        return (
                           <TableHead
                              key={header.id}
                              className={cn(tableHeadClassName)}
                           >
                              {header.isPlaceholder
                                 ? null
                                 : flexRender(
                                      header.column.columnDef.header,
                                      header.getContext()
                                   )}
                           </TableHead>
                        );
                     })}
                  </TableRow>
               ))}
            </TableHeader>

            <TableBody className={cn(tableBodyClassName)}>
               {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                     <TableRow
                        key={row.id}
                        onClick={(event) => handleTableRowClick(row, event)}
                        data-state={row.getIsSelected() && "selected"}
                        className={cn(tableBodyRowClassName)}
                     >
                        {row.getVisibleCells().map((cell) => (
                           <TableCell
                              key={cell.id}
                              className={cn(tableBodyCellClassName)}
                           >
                              {flexRender(
                                 cell.column.columnDef.cell,
                                 cell.getContext()
                              )}
                           </TableCell>
                        ))}
                     </TableRow>
                  ))
               ) : (
                  <TableRow className={cn(tableBodyRowClassName)}>
                     <TableCell
                        colSpan={columns.length}
                        className={cn(
                           tableBodyCellClassName,
                           "h-24 text-center"
                        )}
                     >
                        No results.
                     </TableCell>
                  </TableRow>
               )}
            </TableBody>
         </Table>
      </div>
   );
}
