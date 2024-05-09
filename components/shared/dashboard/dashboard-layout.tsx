"use client";
import { cn } from "@/lib/utils";
import { DashboardLayoutType } from "@/types";
import { ThemeProvider } from "@/services/theme-provider";
import { useDocumentTitle } from "@/hooks/shared/useDocumentTitle";
import Navbar from "@/components/shared/dashboard/navbar/navbar";
import BottomNavbar from "@/components/shared/dashboard/navbar/mobile/bottom-navbar";
import { useMediaQuery } from "@mui/material";
import { useUpdateNavigationHistory } from "@/hooks/shared/useUpdateNavigationHistory";
import SideBar from "./navbar/desktop/sidebar/sidebar";
import useResizeObserver from "use-resize-observer";
import { useSyncMainContentWidth } from "@/hooks/useSyncMainContentWidth";
import { useDispatch, useSelector } from "react-redux";
import { StoreRootState } from "@/services/store";

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
   ); //NOTE: Sets the site document title to the value passed in.
   const mobileScreen = useMediaQuery("(max-width: 1023px)");
   const dispatch = useDispatch();
   const { retractSidebar } = useSelector(
      (state: StoreRootState) => state.navbarSlice
   );

   //NOTE: Updates navigation history on route change with current url
   useUpdateNavigationHistory();

   /*NOTE: The width of the main content will be saved in the slice, to be used across all pages, to make fixed positions styling look like sticky.
    */
   const { ref: mainContentRef, width = 1 } =
      useResizeObserver<HTMLDivElement>();
   useSyncMainContentWidth(width);

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

               <div
                  ref={mainContentRef}
                  id="dashboard-main-content"
                  className={cn(
                     "main-content-margin container py-6 min-h-screen lg:py-8 transition-w ease-linear duration-100",
                     {
                        "lg:ml-[70px]": retractSidebar,
                     }
                  )}
               >
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
