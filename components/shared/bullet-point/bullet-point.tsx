import { BulletPointProps } from "@/types";
import { cn } from "@/lib/utils";

const BulletPoint = ({
   className,
   children,
   bulletPointClassName,
   ...props
}: BulletPointProps) => {
   return (
      <li
         className={cn(
            "grid grid-cols-[4px_1fr] gap-1 items-center",
            className
         )}
         {...props}
      >
         <i
            className={cn(
               "size-1 bg-foreground rounded-full",
               bulletPointClassName
            )}
         />

         {children}
      </li>
   );
};

export default BulletPoint;
