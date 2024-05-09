import { cn } from "@/lib/utils";
import { LoadingIconProps } from "@/types";
import { ReloadIcon } from "@radix-ui/react-icons";

export const LoadingIcon = ({ className, ...props }: LoadingIconProps) => {
   return (
      <ReloadIcon
         className={cn("size-4 mr-2 animate-spin", className)}
         {...props}
      />
   );
};