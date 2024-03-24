import { HiPlus } from "react-icons/hi";
import { FaUserAlt } from "react-icons/fa";
import {
   AiFillHome,
   AiOutlineHome,
   AiFillFileText,
   AiOutlineFileText,
   AiFillFolderOpen,
   AiOutlineFolder,
   AiFillMail,
   AiOutlineMail,
   AiFillSetting,
   AiOutlineSetting,
   AiFillMessage,
   AiOutlineMessage,
   AiOutlineUser,
   AiFillPlusCircle,
} from "react-icons/ai";
import { routeConstants } from "./route-const";

const { authRoute } = routeConstants;

export const navbarConstants = {
   menuItems: [
      {
         label: "Home",
         href: authRoute.main,
         icon: AiOutlineHome,
         activeIcon: AiFillHome,
      },

      {
         label: "Templates",
         href: authRoute.nestedRoute.templates,
         icon: AiOutlineFileText,
         activeIcon: AiFillFileText,
      },

      {
         label: "Projects",
         href: authRoute.nestedRoute.projects,
         icon: AiOutlineFolder,
         activeIcon: AiFillFolderOpen,
      },

      {
         label: "Mailbox",
         href: authRoute.nestedRoute.mailbox,
         icon: AiOutlineMail,
         activeIcon: AiFillMail,
      },

      {
         label: "Settings",
         href: authRoute.nestedRoute.settings,
         icon: AiOutlineSetting,
         activeIcon: AiFillSetting,
      },
   ],

   extraMenu: [
      {
         label: "Profile",
         href: authRoute.nestedRoute.profile,
         icon: AiOutlineUser,
         activeIcon: FaUserAlt,
      },
   ],

   logo: {
      dark: "/site-logo-white.png",
      light: "/site-logo.png",
   },

   Mobile_Navbar_Height: "64px",

   notifications: [
      {
         _id: "65b4e2e6d08405b450f9c0f4",
         title: "Your meeting is starting soon.",
         description: "You have a meeting scheduled in 15 minutes.",
         date: "2022-03-12T08:45:23.123+00:00",
         viewed: false,
      },
      {
         _id: "6a9dc5b1e273a7d42e0b67e3",
         title: "New document shared with you.",
         description: "A new document has been shared with you on Google Docs.",
         date: "2022-08-05T16:21:07.456+00:00",
         viewed: false,
      },
      {
         _id: "3e8b9f7ca1d0f6e2d4b05c83",
         title: "Your password will expire in 3 days.",
         description:
            "Your current password will expire in 3 days. Please update your password.",
         date: "2022-11-19T12:33:59.789+00:00",
         viewed: true,
      },
      {
         _id: "8f2c3b6d0e7a4b95e9f18576",
         title: "You have a new connection request.",
         description: "You have received a new connection request on LinkedIn.",
         date: "2024-03-21T09:59:14.321+00:00",
         viewed: false,
      },
      {
         _id: "2d4b1f9c5e7a8f6b3c0e9d1a",
         title: "Your order has been shipped.",
         description: "Your recent Amazon order has been shipped.",
         date: "2023-07-03T17:10:42.654+00:00",
         viewed: true,
      },
      {
         _id: "1a7d9b3e5c0e6d8f2b4c5e7d",
         title: "Your payment was successful.",
         description: "Your recent payment on PayPal was successful.",
         date: "2023-09-18T10:27:55.987+00:00",
         viewed: true,
      },
      {
         _id: "7e6d5c4b3a2f1e9d8c7b5a4",
         title: "New comment on your post.",
         description: "There is a new comment on your recent Facebook post.",
         date: "2023-12-09T14:50:36.012+00:00",
         viewed: false,
      },
      {
         _id: "9b4c5d6e7f8a1b2c3d4e5f6",
         title: "Profile viewed by a recruiter.",
         description: "Your LinkedIn profile was viewed by a recruiter.",
         date: "2024-02-21T11:08:48.345+00:00",
         viewed: false,
      },
      {
         _id: "5d9e7c8b6a4f2e1d3c0b9a8",
         title: "New like on your tweet.",
         description: "Your recent tweet got a new like.",
         date: "2024-04-30T15:37:09.678+00:00",
         viewed: true,
      },
      {
         _id: "0a1b2c3d4e5f6a7b8c9d0e1",
         title: "Subscription renewed.",
         description: "Your Netflix subscription has been renewed.",
         date: "2024-06-26T13:19:57.890+00:00",
         viewed: true,
      },
   ],
};
