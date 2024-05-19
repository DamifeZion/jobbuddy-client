import { navbarConstants } from "@/constants/navbar-const";
import { cn } from "@/lib/utils";
import { StoreRootState } from "@/services/redux-provider/store";
import { StickyHorizontalContainerProps } from "@/types";
import { motion, Variants } from "framer-motion";
import { useSelector } from "react-redux";

export const StickyHorizontalContainer = ({
   className,
   children,
   open,
   ...props
}: StickyHorizontalContainerProps) => {
   const { retractSidebar } = useSelector(
      (state: StoreRootState) => state.navbarSlice
   );

   /*NOTE: The below makes sure to keep the fixed position width same as the "dashboard main content"... Check dashboard layout for more information*/
   const { mainContentWidth } = useSelector(
      (state: StoreRootState) => state.dashboardMainContentSlice
   );

   const variants: Variants = {
      hidden: {
         y: "100%",
         opacity: 0,
         transition: { ease: "backInOut", duration: 0.3 },
      },
      visible: {
         y: "0%",
         opacity: 1,
         transition: { ease: "backInOut", duration: 0.3 },
      },
   };

   return (
      /*NOTE: Make sure the "margin-left" applied for large screen devices here is exactly same with that in the dashboard layout for lg and up*/
      <motion.div
         initial="hidden"
         animate={open ? "visible" : "hidden"}
         variants={variants}
         style={{
            width: mainContentWidth,
            minHeight: navbarConstants.Mobile_Navbar_Height,
         }}
         className={cn(
            "main-content-margin w-full px-6 py-2 flex items-center justify-between gap-2 fixed bottom-0 left-0 z-30 bg-background border border-border  transition-ml transition-w ease-linear duration-100  lg:border-l-transparent",
            className,
            {
               "ml-[70px]": retractSidebar,
            }
         )}
         {...props}
      >
         {children}
      </motion.div>
   );
};
