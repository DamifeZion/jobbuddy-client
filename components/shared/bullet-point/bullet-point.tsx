import { BulletPointProps } from "@/types";
import { cn } from "@/lib/utils";

const BulletPoint = ({
   className,
   children,
   bulletPointClassName,
   ...props
}: BulletPointProps) => {
   return (
      <li className={cn("inline-flex gap-1 items-center", className)} {...props}>
         <i
            className={cn(
               "size-1 bg-foreground rounded-full",
               bulletPointClassName
            )}
         />

         <span className="flex-grow">
            {children}
         </span>
      </li>
   );
};

export default BulletPoint;
