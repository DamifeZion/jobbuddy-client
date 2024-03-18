import { ReactNode } from "react";
import { IconType } from "react-icons";
import { ButtonProps } from "@/components/ui/button";

export interface DashboardLayoutType {
   children: ReactNode;
   pageTitle: string;
   documentTitle?: string;
   prefixDocumentTitle?: boolean;
}

export interface SidebarButtonProps extends ButtonProps {
   LeftIcon?: IconType;
}

export interface UserSliceProp {
   user: {
      _id: string;
      name: string;
      email: string;
      profile?: string;
   } | null;

   sessionToken: string | null;
}

export interface BuildDashboardRouteProp {
   baseRoute: string;
}

export interface NavbarSliceProp {
   notificationIsOpen: boolean;
}

export interface NotificationSliceProp {
   isLoading?: boolean;

   notifications: {
      _id: string;
      title: string;
      description: string;
      date: string;
      viewed: boolean;
      href?: "";
   }[];
}
