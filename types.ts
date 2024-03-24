import { HTMLAttributes, ReactNode } from "react";
import { IconType } from "react-icons";
import { ButtonProps } from "@/components/ui/button";
import {
   DropdownMenuItemProps,
   DropdownMenuSubTriggerProps,
} from "@radix-ui/react-dropdown-menu";
import { MotionProps } from "framer-motion";
import { SelectItemProps, SelectProps } from "@radix-ui/react-select";
import { ClassNameValue } from "tailwind-merge";
import { Icons } from "next/dist/lib/metadata/types/metadata-types";

type animationDivProp = Omit<HTMLAttributes<HTMLDivElement>, keyof MotionProps>;

export interface DashboardLayoutType {
   children: ReactNode;
   pageTitle: string;
   documentTitle?: string;
   prefixDocumentTitle?: boolean;
}

export interface NavbarButtonProps extends ButtonProps {
   Icon?: IconType;
   iconClassName?: string;
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
   appearanceIsOpen: boolean;
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

export interface OmniRoomProps extends HTMLAttributes<HTMLDivElement> {
   children: ReactNode;
   hideDistance?: number;
   hiddenClassNameStyle?: "";
}

export interface BottomNavbarProp {
   childrenPageRoute?: string;
   children?: ReactNode;
   showChildren?: boolean;
}

export interface UserProfileCardProp {
   className?: string;
}

export interface MyDropdownMenuItemProp extends DropdownMenuItemProps {
   Icon?: IconType;
   iconClassName?: string;
}

export interface MyDropdownMenuSubTriggerProp
   extends DropdownMenuSubTriggerProps {
   Icon?: IconType;
   iconClassName?: string;
   active?: boolean;
}

export interface AnimatedDropdownProp extends animationDivProp {
   open: boolean;
   children: ReactNode;
}

export interface ProjectSliceProp {
   category: "All Categories" | "Resume" | "Cover Letter";
   dateModified:
      | "Anytime"
      | "Today"
      | "Yesterday"
      | "Last 30 Days"
      | "Last Year";
   sortBy:
      | "Newest Edited"
      | "Oldest Edited"
      | "Alphabetical (A-Z)"
      | "Alphabetical (Z-A)";
   selectedProjectsList: string[];
   activeProjectDropdown: string | null;
}

export interface MySelectItemProp extends SelectItemProps {
   Icon?: IconType;
   iconClassName: ClassNameValue;
}


export interface FilterSelectProps {
   type: string;
   label: string;
   selectItem: {
      value: string;
      Icon?: IconType | null;
   }[];
   iconClassName?: string;
}
