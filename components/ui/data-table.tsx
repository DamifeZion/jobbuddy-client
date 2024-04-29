"use client";

import {
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
import { useRef } from "react";

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
   href
}: DataTableProps<TData, TValue>) {
   const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
   });
   const tableBodyRef = useRef<HTMLTableElement>();

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
