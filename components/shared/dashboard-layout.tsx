import { cn } from "@/lib/utils";
import { DashboardLayoutType } from "@/types";
import { ThemeProvider } from "@/services/theme-provider";
import { useDocumentTitle } from "@/hooks/shared/useDocumentTitle";
import Navbar from "@/components/shared/dashboard/navbar/navbar";

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

   return (
      <ThemeProvider
         attribute="class"
         defaultTheme="system"
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
            <div className="pb-16 py-4 flex-grow max-lg:container borde border-red-600 lg:ml-[300px] lg:pb-3">
               {children}
            </div>

            {/* Bottom Navbar for Mobile Screen Only */}
            <nav
               id="mobile-main-navbar"
               className="border-2 border-blue-600 lg:hidden"
            ></nav>
         </section>
      </ThemeProvider>
   );
};

export default DashboardLayout;
