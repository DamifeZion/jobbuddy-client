import { ComponentPropsWithoutRef, HTMLAttributes, ReactNode } from "react";
import { IconType } from "react-icons";
import { ButtonProps } from "@/components/ui/button";
import {
   DropdownMenuItemProps,
   DropdownMenuSubTriggerProps,
} from "@radix-ui/react-dropdown-menu";
import { MotionProps } from "framer-motion";
import {
   SelectItemProps,
   SelectProps,
   SelectTriggerProps,
} from "@radix-ui/react-select";
import { ClassNameValue } from "tailwind-merge";
import {
   DialogContentProps,
   DialogProps,
   DialogTriggerProps,
} from "@radix-ui/react-dialog";
import { Drawer, Drawer as DrawerPrimitive } from "vaul";
import { DispatchProp } from "react-redux";
import { UnknownAction } from "@reduxjs/toolkit";
import { PopoverContentProps } from "@radix-ui/react-popover";
import { IconProps } from "@radix-ui/react-icons/dist/types";
import { ColumnDef } from "@tanstack/react-table";
import { AppDispatch } from "./services/store";

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
      plan: string;
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
   activeProject: {
      id: string;
      title: string;
      date: string;
   };

   downloadFormat:
      | "JPG"
      | "PNG"
      | "PDF Standard"
      | "PDF Print"
      | "DOC"
      | "DOCX";
   listColumnDataState?: "selected" | "false";
}

export interface MySelectItemProp extends SelectItemProps {
   Icon?: IconType | null;
   iconClassName?: ClassNameValue;
}

export interface FilterSelectProps extends SelectProps {
   label: "category" | "date modified" | "sort by";
   selectItem: {
      value: string;
      Icon?: IconType | null;
   }[];
   iconClassName?: string;
}

export interface MyCarouselDirectionProps extends ButtonProps {
   hideWhenNoScroll?: boolean;
}

export type ProjectCardProp = {
   id: string;
   title: string;
   type: "a4" | "folder" | string;
   date: Date;
};

export interface ProjectCardLayoutProps {
   project: ProjectCardProp;
}

export interface RouteSliceProps {
   navigationHistory: string[];
}

export interface UserSubscriptionPlanCardProps
   extends HTMLAttributes<HTMLDivElement> {}

export interface MultistepSlice {
   steps: string | string[];
   currentStep: string;
   currentTitle: string;
   disablePrevButton: boolean;
   disableNextButton: boolean;
}

export interface MultiStepDialogHeaderProps
   extends HTMLAttributes<HTMLDivElement> {
   hidePreviousButton?: boolean;
   onPrevClick?: () => void;
   header?: ReactNode | string;
   description?: ReactNode | string;
   headerClassName?: string;
   /**NOTE:
    * Sequential: Indicates that the dialog’s steps are navigated in a linear, sequential manner (like a slider).
    * Nested:  Indicates that the dialog contains nested multi-step processes. Can be good to simulate dropdowns like tha of canva on large screens or youtube comment drawer on mobile.
    */
   navigationType?: "sequential" | "nested";
   descriptionClassName?: string;
   dynamicStepTitle?: boolean;
}

export interface MultiStepDialogContentProps extends DialogContentProps {}

export interface MultiStepDialogProps extends DialogProps {}

export interface MultiStepDialogTriggerProps extends DialogTriggerProps {
   steps: string | object | string[];
}

export interface MultiStepDrawerProps {
   children: ReactNode;
   open?: boolean;
   onOpenChange?: (open: boolean) => void;
}

export interface MultiStepDrawerTriggerProps
   extends HTMLAttributes<HTMLButtonElement> {
   asChild?: boolean;
   steps: string | object | string[];
}

export interface MultiStepDrawerHeaderProps
   extends MultiStepDialogHeaderProps {}

export interface MultiStepDrawerFooterProps
   extends Omit<HTMLAttributes<HTMLDivElement>, "onAnimationEnd"> {}

export interface MultiStepDropdownSubMenuTriggerProps extends ButtonProps {
   steps: string | object | string[];
}

export interface MultiStepDropdownHeaderProps
   extends Omit<
      MultiStepDialogHeaderProps,
      | "headerTitle"
      | "headerDescription"
      | "headerTitleClassName"
      | "headerDescriptionClassName"
   > {}

export interface MultiStepDropdownContentProps extends PopoverContentProps {}

export interface MultiStepDropdownMenuItemProps
   extends HTMLAttributes<HTMLButtonElement> {
   href?: string;
   routing?: "internal" | "external";
   target?: "_blank" | "_parent" | "__self" | "_top";
}

export interface DrawerContentProps
   extends ComponentPropsWithoutRef<typeof DrawerPrimitive.Content> {
   showLine?: boolean;
   lineClassName?: string;
}

export interface ViewportContainerProps
   extends HTMLAttributes<HTMLDivElement> {}

export interface SelectDrawerTriggerProps
   extends HTMLAttributes<HTMLButtonElement> {}

export interface SelectDrawerContentProps extends DrawerContentProps {}

export interface SelectDrawerHeaderProps
   extends ComponentPropsWithoutRef<typeof DrawerPrimitive.Title> {}

export interface SelectDrawerItemProps
   extends HTMLAttributes<HTMLButtonElement> {
   Icon?: IconType | null;
   iconClassName?: string;
   value: string;
   isSelected?: boolean;
   defaultValue?: string;
   onValueChange: ((value: string) => void) | undefined;
}

export interface SelectDrawerSliceProps {
   selectedValue: string;
}

export interface MainOptionProps
   extends HTMLAttributes<HTMLDivElement>,
      ProjectCardLayoutProps {}

export interface BulletPointProps extends HTMLAttributes<HTMLLIElement> {
   bulletPointClassName?: string;
}

export interface isLoadingSLice {
   isLoading: boolean;
}

export interface RenameFileApiProps {
   filename: string;
   projectId: string;
}

export interface FormSuccessProps {
   data: {};
}

export interface FormErrorProps {
   err: any;
}

export interface LoadingIconProps extends IconProps {}

export interface ActionFooterProps extends HTMLAttributes<HTMLDivElement> {
   childrenPageRoute?: string;
   showChildren?: boolean;
}

export interface DashboardMainContentSliceProps {
   mainContentWidth: string;
}

export interface ProjectBulkActionProps {
   project: ProjectCardProp[];
}

export interface ClipboardProps {
   copied: {
      success: boolean;
      msg: string;
   };
}

export interface DataTableProps<TData, TValue> {
   columns: ColumnDef<TData, TValue>[];
   data: TData[];
   className?: string;
   tableHeaderClassName?: string;
   tableHeadRowClassName?: string;
   tableHeadClassName?: string;
   tableBodyClassName?: string;
   tableBodyRowClassName?: string;
   tableBodyCellClassName?: string;
   href?: string;
}

export interface ListCardProps {
   smMobileScreen: boolean;
}
