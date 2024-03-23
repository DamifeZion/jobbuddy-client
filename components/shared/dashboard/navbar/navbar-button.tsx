import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NavbarButtonProps } from "@/types";

const NavbarButton = ({
   children,
   className,
   Icon,
   iconClassName,
   ...props
}: NavbarButtonProps) => {
   return (
      <Button
         variant="ghost"
         className={cn("w-full h-11 gap-4 justify-start text-lg", className)}
         {...props}
      >
         {Icon && (
            <span className={cn("text-2xl", iconClassName)}>
               <Icon />
            </span>
         )}

         {children}
      </Button>
   );
};

export default NavbarButton;
