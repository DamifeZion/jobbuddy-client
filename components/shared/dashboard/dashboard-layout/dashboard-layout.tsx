"use client";
import { cn } from "@/lib/utils";
import { DashboardLayoutType } from "@/types";
import { ThemeProvider } from "@/services/theme-provider";
import { useDocumentTitle } from "@/hooks/shared/useDocumentTitle";
import Navbar from "@/components/shared/dashboard/navbar/navbar";
import BottomNavbar from "@/components/shared/dashboard/navbar/mobile/bottom-navbar";
import { useMediaQuery } from "@mui/material";
import { useUpdateNavigationHistory } from "@/hooks/shared/useUpdateNavigationHistory";
import SideBar from "../navbar/desktop/sidebar/sidebar";

const DashboardLayout = ({
   children,
   pageTitle,
   hidePageTitle = false,
   documentTitle,
   prefixDocumentTitle,
}: DashboardLayoutType) => {
   useDocumentTitle(
      documentTitle ? documentTitle : pageTitle,
      prefixDocumentTitle
   ); // Sets the site document title to the value passed in.
   const mobileScreen = useMediaQuery("(max-width: 1023px)");

   // Updates navigation history on route change with current url
   useUpdateNavigationHistory();

   return (
      <ThemeProvider
         attribute="class"
         defaultTheme="light"
         enableSystem
         disableTransitionOnChange
      >
         <section
            id="dashboard"
            className={cn("min-h-screen min-w-[300px] w-full grid grid-cols-1")}
         >
            <div className="sticky top-0 left-0 z-40">
               <Navbar />
            </div>

            {/* Main Page */}
            <div className="flex">
               <div className="max-lg:hidden">
                  <SideBar />
               </div>

               <div className="container py-6 min-h-screen lg:py-8 lg:ml-[270px]">
                  <h1
                     className={cn("capitalize text-4xl lg:hidden", {
                        hidden: hidePageTitle,
                     })}
                  >
                     {pageTitle ? pageTitle : documentTitle}
                  </h1>

                  {children}
               </div>
            </div>

            {/* Bottom Navbar for Mobile Screen Only */}
            {mobileScreen && <BottomNavbar />}
         </section>
      </ThemeProvider>
   );
};

export default DashboardLayout;
