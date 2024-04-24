"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ProjectCardProp } from "@/types";
import moment from "moment";

const listCard: ColumnDef<ProjectCardProp>[] = [
   {
      accessorKey: "title",
      header: "Name",
      cell: ({ row }) => {
         return <div className="capitalize">{row.getValue("title")}</div>;
      },
   },
   {
      accessorKey: "date",
      header: "Edited",
      cell: ({ row }) => {
         const date = row.getValue("date") as Date;
         const formatDate = moment(date).fromNow();

         return <h1>{formatDate}</h1>;
      },
   },
];

export default listCard;
