import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SidebarButtonProps } from "@/types";

const SidebarButton = ({
   LeftIcon,
   children,
   className,
   ...props
}: SidebarButtonProps) => {
   return (
      <Button
         variant="ghost"
         className={cn(
            "w-full h-12 gap-3 justify-start rounded-lg text-lg",
            className
         )}
         {...props}
      >
         {LeftIcon && <LeftIcon size={26} />}

         {children}
      </Button>
   );
};

export default SidebarButton;
