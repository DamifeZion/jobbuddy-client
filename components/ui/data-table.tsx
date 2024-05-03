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

export function DataTable<TData, TValue>({
   columns,
   data,
   selectedItems,
   className,
   tableBodyCellClassName,
   tableBodyClassName,
   tableBodyRowClassName,
   tableHeadClassName,
   tableHeadRowClassName,
   tableHeaderClassName,
}: DataTableProps<TData, TValue>) {
   const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
   });

   const handleTableRowClick = (
      row: Row<TData>,
      value: React.MouseEvent<HTMLTableRowElement, MouseEvent>
   ) => {
      if (table.getIsSomeRowsSelected()) {
         row.toggleSelected(!!value);
      }
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
                  table.getRowModel().rows.map((row) => {
                     //NOTE: The goal of this is to not necessarily use the table internal state, and one can therefore uniquely toggle the data state, upon providing an array that updates with item id. This makes it easier to work with. A sample case is 'Project' page
                     const { id: rowId } = row.original as { id: string };
                     const itemIsChecked =
                        selectedItems && selectedItems.includes(rowId);

                     return (
                        <TableRow
                           key={row.id}
                           onClick={(value) => handleTableRowClick(row, value)}
                           data-state={
                              (itemIsChecked && "selected") ||
                              (row.getIsSelected() && "selected")
                           }
                           className={cn(tableBodyRowClassName, {})}
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
                     );
                  })
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
