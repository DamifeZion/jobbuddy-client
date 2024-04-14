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

   projectItem: [
      //Mocking data from DB
      {
         id: "0",
         title: "Fullstack Resume",
         date: new Date("2022-01-01"), // Hardcoded date in ISO string format
      },

      {
         id: "1",
         title: "Backend Node.js Resume",
         date: new Date("2022-02-15"),
      },

      {
         id: "2",
         title: "Accounting Resume",
         date: new Date("2022-03-10"),
      },

      {
         id: "3",
         title: "Remastered Engineering Resume",
         date: new Date("2022-06-20"),
      },

      {
         id: "4",
         title: "Frontend Developer Resume",
         date: new Date("2022-07-05"),
      },

      {
         id: "5",
         title: "UX/UI Designer Resume",
         date: new Date("2022-08-10"),
      },

      {
         id: "6",
         title: "Data Scientist Resume",
         date: new Date("2022-09-15"),
      },

      {
         id: "7",
         title: "Marketing Manager Resume",
         date: new Date("2022-10-20"),
      },

      {
         id: "8",
         title: "Software Engineer Resume",
         date: new Date("2022-11-25"),
      },

      {
         id: "9",
         title: "Product Manager Resume",
         date: new Date("2022-12-30"),
      },

      {
         id: "10",
         title: "Digital Marketer Resume",
         date: new Date("2023-01-05"),
      },

      {
         id: "11",
         title: "Graphic Designer Resume",
         date: new Date("2023-02-10"),
      },

      {
         id: "12",
         title: "Sales Representative Resume",
         date: new Date("2023-03-15"),
      },

      {
         id: "13",
         title: "Business Analyst Resume",
         date: new Date("2023-04-20"),
      },

      {
         id: "14",
         title: "Mobile App Developer Resume",
         date: new Date("2023-05-25"),
      },

      {
         id: "15",
         title: "Content Writer Resume",
         date: new Date("2023-06-30"),
      },

      {
         id: "16",
         title: "Project Manager Resume",
         date: new Date("2023-07-05"),
      },

      {
         id: "17",
         title: "Network Engineer Resume",
         date: new Date("2023-08-10"),
      },

      {
         id: "18",
         title: "Social Media Manager Resume",
         date: new Date("2023-09-15"),
      },

      {
         id: "19",
         title: "Quality Assurance Analyst Resume",
         date: new Date("2023-10-20"),
      },

      {
         id: "20",
         title: "DevOps Engineer Resume",
         date: new Date("2023-11-25"),
      },

      {
         id: "21",
         title: "Human Resources Manager Resume",
         date: new Date("2023-12-30"),
      },

      {
         id: "22",
         title: "Financial Analyst Resume",
         date: new Date("2024-01-05"),
      },

      {
         id: "23",
         title: "IT Support Specialist Resume",
         date: new Date("2024-02-10"),
      },

      {
         id: "24",
         title: "Data Engineer Resume",
         date: new Date("2025-01-05"),
      },

      {
         id: "25",
         title: "Marketing Analyst Resume",
         date: new Date("2025-02-10"),
      },

      {
         id: "26",
         title: "UI/UX Developer Resume",
         date: new Date("2025-03-15"),
      },

      {
         id: "27",
         title: "Business Development Manager Resume",
         date: new Date("2025-04-20"),
      },

      {
         id: "28",
         title: "Machine Learning Engineer Resume",
         date: new Date("2025-05-25"),
      },

      {
         id: "29",
         title: "Technical Project Manager Resume",
         date: new Date("2025-06-30"),
      },

      {
         id: "30",
         title: "Full Stack JavaScript Developer Resume",
         date: new Date("2025-07-05"),
      },

      {
         id: "31",
         title: "Digital Marketing Specialist Resume",
         date: new Date("2025-08-10"),
      },

      {
         id: "32",
         title: "IT Consultant Resume",
         date: new Date("2025-09-15"),
      },

      {
         id: "33",
         title: "Product Owner Resume",
         date: new Date("2025-10-20"),
      },

      {
         id: "34",
         title: "Frontend UI/UX Designer Resume",
         date: new Date("2025-11-25"),
      },

      {
         id: "35",
         title: "Cloud Solutions Architect Resume",
         date: new Date("2025-12-30"),
      },

      {
         id: "36",
         title: "Social Media Specialist Resume",
         date: new Date("2026-01-05"),
      },

      {
         id: "37",
         title: "Software Quality Assurance Engineer Resume",
         date: new Date("2026-02-10"),
      },

      {
         id: "38",
         title: "Product Marketing Manager Resume",
         date: new Date("2026-03-15"),
      },

      {
         id: "39",
         title: "Data Visualization Specialist Resume",
         date: new Date("2026-04-20"),
      },

      {
         id: "40",
         title: "Backend Python Developer Resume",
         date: new Date("2026-05-25"),
      },

      {
         id: "41",
         title: "IT Security Analyst Resume",
         date: new Date("2026-06-30"),
      },

      {
         id: "42",
         title: "Content Marketing Manager Resume",
         date: new Date("2026-07-05"),
      },

      {
         id: "43",
         title: "UX/UI Researcher Resume",
         date: new Date("2026-08-10"),
      },
   ],

   downloadFormatSelect: [
      {
         type: "JPG",
         desc: "Ideal for web use",
      },

      {
         type: "PNG",
         desc: "High quality graphics",
      },

      {
         type: "PDF Standard",
         desc: "Universal compatibility",
      },

      {
         type: "PDF Print",
         desc: "Optimized for print",
      },

      {
         type: "DOC",
         desc: "Editable in Word",
      },

      {
         type: "DOCX",
         desc: "Modern Word format",
      },
   ],
};
