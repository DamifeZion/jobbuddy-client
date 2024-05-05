"use client";

import {
   Row,
   SortingState,
   flexRender,
   getCoreRowModel,
   getPaginationRowModel,
   getSortedRowModel,
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
import { useState } from "react";
import { Button } from "./button";
import {
   ChevronLeftIcon,
   ChevronRightIcon,
   DoubleArrowLeftIcon,
   DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectValue,
   SelectTrigger,
} from "./select";

export function DataTable<TData, TValue>({
   columns,
   data,
   selectedItems,
   className,
   usePagination,
   tableBodyCellClassName,
   tableBodyClassName,
   tableBodyRowClassName,
   tableHeadClassName,
   tableHeadRowClassName,
   tableHeaderClassName,
}: DataTableProps<TData, TValue>) {
   const [sorting, setSorting] = useState<SortingState>([]);
   const table = useReactTable({
      data,
      columns,
      onSortingChange: setSorting,
      getSortedRowModel: getSortedRowModel(),
      getCoreRowModel: getCoreRowModel(),
      state: {
         sorting,
      },
      ...(usePagination
         ? { getPaginationRowModel: getPaginationRowModel() }
         : {}),
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

         {/* If usePagination is true then we show this */}
         {usePagination && (
            <div>
               <div className="flex items-center justify-between mt-6 space-x-6 500:flex-row lg:space-x-8">
                  <div className="flex items-center space-x-2">
                     <p className="text-sm font-medium">Rows per page</p>

                     <Select
                        value={`${table.getState().pagination.pageSize}`}
                        onValueChange={(value) => {
                           table.setPageSize(Number(value));
                        }}
                     >
                        <SelectTrigger className="h-8 w-[70px]">
                           <SelectValue
                              placeholder={table.getState().pagination.pageSize}
                           />
                        </SelectTrigger>
                        <SelectContent side="top">
                           {[10, 20, 30, 40, 50].map((pageSize) => (
                              <SelectItem key={pageSize} value={`${pageSize}`}>
                                 {pageSize}
                              </SelectItem>
                           ))}
                        </SelectContent>
                     </Select>
                  </div>

                  <div className="max-500:hidden flex w-[100px] items-center justify-center text-sm font-medium">
                     Page {table.getState().pagination.pageIndex + 1} of{" "}
                     {table.getPageCount()}
                  </div>

                  <div className="flex items-center space-x-4">
                     <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                     >
                        <span className="sr-only">Go to first page</span>
                        <DoubleArrowLeftIcon className="h-4 w-4" />
                     </Button>
                     <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                     >
                        <span className="sr-only">Go to previous page</span>
                        <ChevronLeftIcon className="h-4 w-4" />
                     </Button>
                     <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                     >
                        <span className="sr-only">Go to next page</span>
                        <ChevronRightIcon className="h-4 w-4" />
                     </Button>
                     <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() =>
                           table.setPageIndex(table.getPageCount() - 1)
                        }
                        disabled={!table.getCanNextPage()}
                     >
                        <span className="sr-only">Go to last page</span>
                        <DoubleArrowRightIcon className="h-4 w-4" />
                     </Button>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}
