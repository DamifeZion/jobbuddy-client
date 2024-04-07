"use client";
import { cn } from "@/lib/utils";
import { DashboardLayoutType } from "@/types";
import { ThemeProvider } from "@/services/theme-provider";
import { useDocumentTitle } from "@/hooks/shared/useDocumentTitle";
import Navbar from "@/components/shared/dashboard/navbar/navbar";
import BottomNavbar from "@/components/shared/dashboard/navbar/mobile/bottom-navbar";
import { useMediaQuery } from "@mui/material";
import { useUpdateNavigationHistory } from "@/hooks/shared/useUpdateNavigationHistory";

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
   useUpdateNavigationHistory()
   


   return (
      <ThemeProvider
         attribute="class"
         defaultTheme="light"
         enableSystem
         disableTransitionOnChange
      >
         <section
            id="dashboard"
            className={cn(
               "min-h-screen min-w-[300px] w-full flex flex-col lg:flex-row"
            )}
         >
            <Navbar />

            {/* Main Page */}
            <div className="container py-3 min-h-screen lg:py-6 lg:ml-[270px]">
               <h1 className={cn("capitalize text-2xl lg:hidden", {
                  "hidden": hidePageTitle
               })}>
                  {pageTitle ? pageTitle : documentTitle}
               </h1>

               {children}
            </div>

            {/* Bottom Navbar for Mobile Screen Only */}
            {mobileScreen && <BottomNavbar />}
         </section>
      </ThemeProvider>
   );
};

export default DashboardLayout;
