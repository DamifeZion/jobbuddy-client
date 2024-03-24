import { BsSortAlphaDown } from "react-icons/bs";
import { BsSortAlphaUp } from "react-icons/bs";
import { TbClockHour5 } from "react-icons/tb";
import { TbClockHour2 } from "react-icons/tb";
import { FiFileText } from "react-icons/fi";
import { RiFileUserLine } from "react-icons/ri";
import { BiGridAlt } from "react-icons/bi";

export const projectConstants = {
   filterOptions: {
      categoryOptions: [
         {
            value: "All Categories",
            Icon: BiGridAlt,
         },

         {
            value: "Resume",
            Icon: RiFileUserLine,
         },

         {
            value: "Cover Letter",
            Icon: FiFileText,
         },
      ],

      dateModifiedOptions: [
         {
            value: "Today",
            Icon: null,
         },

         {
            value: "Yesterday",
            Icon: null,
         },

         {
            value: "Last 30 Days",
            Icon: null,
         },

         {
            value: "Last Year",
            Icon: null,
         },

         {
            value: "Anytime",
            Icon: null,
         },
      ],

      sortByOptions: [
         {
            value: "Newest Edited",
            Icon: TbClockHour2,
         },

         {
            value: "Oldest Edited",
            Icon: TbClockHour5,
         },

         {
            value: "Alphabetical (A-Z)",
            Icon: BsSortAlphaUp,
         },

         {
            value: "Alphabetical (Z-A)",
            Icon: BsSortAlphaDown,
         },
      ],
   },
};
