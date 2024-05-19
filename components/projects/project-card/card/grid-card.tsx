import { cn } from "@/lib/utils";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
   Tooltip,
   TooltipContent,
   TooltipTrigger,
} from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";
import { setSelectedProjects } from "@/services/slices/dashboard/project-slice/projectSlice";
import { StoreRootState } from "@/services/redux-provider/store";
import { ProjectCardLayoutProps } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import MainOptions from "../options/main-options";
import { useHandleProjectCardClick } from "@/hooks/project/useHandleProjectCardClick";

const GridCard = ({ project }: ProjectCardLayoutProps) => {
   const { handleCardClick } = useHandleProjectCardClick(project); //NOTE: To handle project card clicks
   const dispatch = useDispatch();
   const { selectedProjects } = useSelector(
      (state: StoreRootState) => state.projectSlice
   );
   const projectIsChecked = selectedProjects.includes(project.id);
   const hasSelectedProjects = selectedProjects.length > 0;

   return (
      <div key={project.id}>
         <Card
            aria-disabled={true}
            className={cn(
               "group/card h-24 shadow-sm overflow-hidden rounded-md cursor-pointer relative ease-linear duration-100 min-[360px]:h-32 400:h-36 lg:hover:bg-accent",
               {
                  "border-2 border-ring ease-linear duration-75":
                     projectIsChecked,
               }
            )}
         >
            <CardHeader className="w-full absolute top-0 left-0 p-2 flex-row items-center justify-between gap-4 transition-all ease-in-out duration-75">
               <Checkbox
                  id={`project-${project.id}`}
                  checked={projectIsChecked}
                  onCheckedChange={() =>
                     dispatch(setSelectedProjects(project.id))
                  }
                  className={cn(
                     "size-8 border-2 border-border bg-background shadow-none z-[1] checked:border-primary lg:size-7",
                     {
                        "lg:invisible lg:opacity-0 lg:group-hover/card:visible lg:group-hover/card:opacity-100":
                           !hasSelectedProjects,
                     }
                  )}
               />

               <MainOptions project={project} />
            </CardHeader>

            <CardContent
               onClick={handleCardClick}
               className="h-full w-full flex items-center justify-center overflow-y-hidden"
            >
               <div
                  id="resume-preview"
                  className="h-[118%] w-full relative z-0 top-6 text-xsm rounded-sm 400:w-[140px] border border-foreground xl:w-[180px]"
               ></div>
            </CardContent>
         </Card>

         <div
            className="
            mt-2
            [&_span]:w-full [&_span]:line-clamp-1 [&_span]:text-sm [&_span]:font-semibold
            [&_small]:capitalize [&_small]:text-muted-foreground
         "
         >
            <Tooltip>
               <TooltipTrigger asChild>
                  <span>{project.title}</span>
               </TooltipTrigger>

               <TooltipContent align="start" side="bottom">
                  {project.title}
               </TooltipContent>
            </Tooltip>

            <small>{project.type}</small>
         </div>
      </div>
   );
};

export default GridCard;
