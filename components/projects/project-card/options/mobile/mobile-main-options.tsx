import {
   MultiStepDrawer,
   MultiStepDrawerContent,
   MultiStepDrawerHeader,
   MultiStepDrawerTrigger,
} from "@/components/shared/multi-step/multi-step-drawer";
import { Button } from "@/components/ui/button";
import { DrawerTrigger } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import DefaultHeader from "../../default-header/default-header";
import { ProjectCardLayoutProps } from "@/types";
import { Separator } from "@/components/ui/separator";

const MobileMainOptions = ({ project }: ProjectCardLayoutProps) => {
   return (
      <MultiStepDrawer>
         <DrawerTrigger asChild>
            <Button
               size="icon"
               variant="outline"
               className={cn(
                  "group/options size-8 !m-0 bg-background z-[1] rounded-[calc(var(--radius)_-_6px)] hover:bg-primary"
               )}
            >
               <BiDotsHorizontalRounded className="text-foreground size-5/6 group-hover/options:text-white lg:size-5/6" />
            </Button>
         </DrawerTrigger>

         <MultiStepDrawerContent showLine={true}>
            <MultiStepDrawerHeader
               navigationType="nested"
               header={<DefaultHeader project={project} />}
               className="px-0"
            />


            <div className="pt-3">
               INMicneiniencneincnincienc
            </div>
         </MultiStepDrawerContent>
      </MultiStepDrawer>
   );
};

export default MobileMainOptions;
