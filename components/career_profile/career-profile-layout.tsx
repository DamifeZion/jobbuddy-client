"use client";
import { CareerProfileLayoutsProps } from "@/types";
import DashboardLayout from "@/components/shared/dashboard/dashboard-layout";
import Header from "./header";
import CareerSidebar from "./career-sidebar";
import { cn } from "@/lib/utils";

export const CareerProfileLayouts = ({
   children,
   showHeader = false,
   pageTitle,
   isHome = false,
}: CareerProfileLayoutsProps) => {
   return (
      <DashboardLayout pageTitle={pageTitle} hidePageTitle>
         {showHeader && <Header />}

         <div
            className={cn("flex gap-6 max-lg:flex-col-reverse", {
               "mt-6": showHeader,
            })}
         >
            {children && <div className="w-full">{children}</div>}

            <div className={cn("flex-grow", {
               "max-lg:hidden": !isHome,
            })}>
               <CareerSidebar />
            </div>
         </div>
      </DashboardLayout>
   );
};
