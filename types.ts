import React, {
   ComponentProps,
   ComponentPropsWithoutRef,
   HTMLAttributes,
   ReactNode,
} from "react";
import { IconType } from "react-icons";
import { ButtonProps } from "@/components/ui/button";
import {
   DropdownMenuItemProps,
   DropdownMenuSubTriggerProps,
} from "@radix-ui/react-dropdown-menu";
import { MotionProps } from "framer-motion";
import { SelectItemProps, SelectProps } from "@radix-ui/react-select";
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
   stepTitles: string | string[];
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
   headerTitle?: ReactNode | string;
   headerDescription?: ReactNode | string;
   headerTitleClassName?: string;
   headerDescriptionClassName?: string;
}

export interface MultiStepDialogContentProps extends DialogContentProps {}

export interface MultiStepDialogProps extends DialogProps {}

export interface MultiStepDialogTriggerProps extends DialogTriggerProps {
   steps: string | object | string[];
   stepTitles?: string | string[];
}

export interface MultiStepDrawerProps {
   children: ReactNode;
}

export interface MultiStepDrawerTriggerProps
   extends HTMLAttributes<HTMLButtonElement> {
   asChild?: boolean;
   steps: string | object | string[];
   stepTitles?: string | string[];
}

export interface MultiStepDrawerHeaderProps
   extends MultiStepDialogHeaderProps {}

export interface MultiStepDrawerFooterProps
   extends Omit<HTMLAttributes<HTMLDivElement>, "onAnimationEnd"> {}

export interface MultiStepDropdownSubMenuTriggerProps
   extends HTMLAttributes<HTMLSpanElement> {
   steps: string | object | string[];
   stepTitles?: string | string[];
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
   extends Omit<HTMLAttributes<HTMLButtonElement>, "children"> {
   Icon?: IconType;
   iconClassName?: string;
   value: string;
   isSelected?: boolean;
   defaultValue?: string;
   onValueChange: ((value: string) => void) | undefined;
}

export interface SelectDrawerSliceProps {
   selectedValue: string;
}

export interface mainOptionProps
   extends HTMLAttributes<HTMLDivElement>,
      Omit<ProjectCardLayoutProps, "handleMarkAll" | "totalProjectCount"> {}

export interface BulletPointProps extends HTMLAttributes<HTMLLIElement> {
   bulletPointClassName?: string;
}
