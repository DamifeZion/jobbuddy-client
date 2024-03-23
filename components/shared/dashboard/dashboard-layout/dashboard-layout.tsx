import { cn } from "@/lib/utils";
import { DashboardLayoutType } from "@/types";
import { ThemeProvider } from "@/services/theme-provider";
import { useDocumentTitle } from "@/hooks/shared/useDocumentTitle";
import Navbar from "@/components/shared/dashboard/navbar/navbar";
import BottomNavbar from "@/components/shared/dashboard/navbar/mobile/bottom-navbar";
import { useMediaQuery } from "@mui/material";

const DashboardLayout = ({
   children,
   pageTitle,
   documentTitle,
   prefixDocumentTitle,
}: DashboardLayoutType) => {
   useDocumentTitle(
      !documentTitle ? pageTitle : documentTitle,
      prefixDocumentTitle
   ); // Sets the site document title to the value passed in.

   const mobileScreen = useMediaQuery("(max-width: 1023px)");

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
            <div className="container py-6 min-h-[1000px] flex border border-red-600 lg:ml-[270px]">
               {children}
            </div>

            {/* Bottom Navbar for Mobile Screen Only */}
            {mobileScreen && <BottomNavbar />}
         </section>
      </ThemeProvider>
   );
};

export default DashboardLayout;
