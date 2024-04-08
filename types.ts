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
import { DialogContentProps, DialogProps } from "@radix-ui/react-dialog";

type animationDivProp = Omit<HTMLAttributes<HTMLDivElement>, keyof MotionProps>;

export interface DashboardLayoutType {
   children: ReactNode;
   pageTitle: string;
   hidePageTitle?: boolean;
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
   category: "all categories" | "resume" | "cover Letter";
   dateModified:
      | "anytime"
      | "today"
      | "yesterday"
      | "last 30 days"
      | "last year";
   sortBy:
      | "newest edited"
      | "oldest edited"
      | "alphabetical (A-Z)"
      | "alphabetical (Z-A)";
   viewMode: "grid" | "list";
   selectedProjects: string[];
   activeProjectDropdown: string | null;
}

export interface MySelectItemProp extends SelectItemProps {
   Icon?: IconType | null;
   iconClassName?: ClassNameValue;
}

export interface FilterSelectProps extends SelectProps {
   label: string;
   selectItem: {
      value: string;
      Icon?: IconType | null;
   }[];
   iconClassName?: string;
}

export interface MyCarouselDirectionProps extends ButtonProps {
   hideWhenNoScroll?: boolean;
}

export interface ProjectCardLayoutProps {
   project: {
      id: string;
      title: string;
      date: Date;
   };
   handleMarkAll?: () => void;
   totalProjectCount?: number;
}

export interface RouteSliceProps {
   navigationHistory: string[];
}

export interface UserSubscriptionPlanCardProps
   extends HTMLAttributes<HTMLDivElement> {}

export interface MultistepSlice {
   steps: string[];
   currentStep: string;
}

export interface MultiStepDialogHeaderProps
   extends HTMLAttributes<HTMLDivElement> {
   defaultStep: string;
   hidePreviousButton?: boolean;
   onPrevClick: () => void;
}

export interface MultiStepDialogContentProps extends DialogContentProps {
   showOnStep: string;
}
