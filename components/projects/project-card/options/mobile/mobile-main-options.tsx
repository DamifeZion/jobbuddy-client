import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BiDotsHorizontalRounded } from "react-icons/bi";

const MobileMainOptions = () => {
   return (
      <>
         <Button
            size="icon"
            variant="outline"
            className={cn(
               "group/options size-6 !m-0 bg-background z-[1] rounded-[calc(var(--radius)_-_6px)] hover:bg-primary"
            )}
         >
            <BiDotsHorizontalRounded className="text-foreground size-5/6 group-hover/options:text-white lg:size-5/6" />
         </Button>
      </>
   );
};

export default MobileMainOptions;
