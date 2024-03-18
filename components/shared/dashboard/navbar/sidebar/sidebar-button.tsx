import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SidebarButtonProps } from "@/types";
import { useMediaQuery } from "@mui/material";

const SidebarButton = ({
   LeftIcon,
   children,
   className,
   ...props
}: SidebarButtonProps) => {

   const mobileScreen = useMediaQuery('(max-width: 1023px)');

   return (
      <Button
         variant="ghost"
         className={cn(
            "w-full h-12 gap-3 justify-start rounded-lg text-lg",
            className
         )}
         {...props}
      >
         {LeftIcon && <LeftIcon size={mobileScreen ? 24 : 26} />}

         {children}
      </Button>
   );
};

export default SidebarButton;
