import { Button } from "@/components/ui/button";
import { screenConstants } from "@/constants/screen-const";
import { cn } from "@/lib/utils";
import { StoreRootState } from "@/services/store";
import { NavbarButtonProps } from "@/types";
import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import {
   Tooltip,
   TooltipTrigger,
   TooltipContent,
   TooltipProvider,
} from "@/components/ui/tooltip";

const NavbarButton = ({
   children,
   className,
   Icon,
   iconClassName,
   ...props
}: NavbarButtonProps) => {
   const { retractSidebar } = useSelector(
      (state: StoreRootState) => state.navbarSlice
   );
   const desktopScreen = useMediaQuery(
      `(min-width: ${screenConstants.Mobile_Screen_PX})`
   );

   //NOTE: We only want to retract sidebar if on desktop.
   const shouldRetractSidebar = desktopScreen && retractSidebar;

   return (
      <TooltipProvider>
         <Tooltip>
            <TooltipTrigger asChild>
               <Button
                  variant="ghost"
                  className={cn(
                     "w-full h-10 gap-3 justify-start text-md",
                     className,
                     {
                        "justify-center": shouldRetractSidebar,
                     }
                  )}
                  {...props}
               >
                  {Icon && (
                     <span className={cn("text-2xl", iconClassName)}>
                        <Icon />
                     </span>
                  )}

                  {!shouldRetractSidebar && children}
               </Button>
            </TooltipTrigger>

            {/* NOTE: We dont want to show the tooltip content if the sidebar is not retracted. It's redundant */}
            {shouldRetractSidebar && (
               <TooltipContent side="right">{children}</TooltipContent>
            )}
         </Tooltip>
      </TooltipProvider>
   );
};

export default NavbarButton;
