import { cn } from "@/lib/utils";
import {
   Card,
   CardHeader,
   CardContent,
   CardFooter,
   CardDescription,
} from "@/components/ui/card";
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";
import {
   clearSelectedProjects,
   setSelectedProjects,
} from "@/services/slices/project-slice/projectSlice";
import { StoreRootState } from "@/services/store";
import { ProjectCardLayoutProps } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { buildEditProjectRoute } from "@/constants/route-const";
import CardOptions from "../options/main-options";

const GridCard = ({ project, totalProjectCount }: ProjectCardLayoutProps) => {
   const router = useRouter();
   const dispatch = useDispatch();
   const { selectedProjects } = useSelector(
      (state: StoreRootState) => state.projectSlice
   );

   const { id, title, date } = project;
   const projectIsChecked = selectedProjects.includes(id);
   const hasSelectedProjects = selectedProjects.length > 0;

   const handleCardClick = () => {
      //NOTE: If there is any project selected, then we toggle the checkbox on click else we route.
      if (hasSelectedProjects) {
         return dispatch(setSelectedProjects(id));
      }

      return router.push(buildEditProjectRoute(id));
   };

   return (
      <div key={id}>
         <Card
            aria-disabled={true}
            className={cn(
               "group/card h-24 shadow-sm overflow-hidden rounded-md cursor-pointer relative hover:bg-accent ease-linear duration-100 min-[360px]:h-32 400:h-36",
               {
                  "border-2 border-ring ease-linear duration-75":
                     projectIsChecked,
               }
            )}
         >
            <CardHeader className="w-full absolute top-0 left-0 p-2 flex-row items-center justify-end gap-2 transition-all ease-in-out duration-75 lg:justify-between">
               <Checkbox
                  id={`project-${id}`}
                  checked={projectIsChecked}
                  onCheckedChange={() => dispatch(setSelectedProjects(id))}
                  className={cn(
                     "size-6 border-2 border-border bg-background shadow-none z-[1] checked:border-primary rounded-[calc(var(--radius)_-_6px)] sm:size-7",
                     {
                        "lg:invisible lg:opacity-0 lg:group-hover/card:visible lg:group-hover/card:opacity-100":
                           !hasSelectedProjects,
                     }
                  )}
               />

               <CardOptions />
            </CardHeader>

            <CardContent
               onClick={handleCardClick}
               className="h-full w-full flex items-center justify-center overflow-y-hidden"
            >
               <div
                  id="resume-preview"
                  className="h-[118%] w-full relative z-0 top-6 text-xsm rounded-sm 400:w-[140px] border border-destructive xl:w-[180px]"
               ></div>
            </CardContent>
         </Card>

         <div className="mt-2 flex items-center">
            <TooltipProvider>
               <Tooltip>
                  <TooltipTrigger asChild>
                     <span className="w-full line-clamp-1 text-sm font-semibold">
                        {title}
                     </span>
                  </TooltipTrigger>

                  <TooltipContent align="start" side="bottom">
                     {title}
                  </TooltipContent>
               </Tooltip>
            </TooltipProvider>
         </div>
      </div>
   );
};

export default GridCard;
