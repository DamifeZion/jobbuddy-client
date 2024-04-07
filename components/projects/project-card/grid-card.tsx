import {cn} from '@/lib/utils';
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
} from "@/components/ui/tooltip"
import { Checkbox } from "@/components/ui/checkbox";
import { clearSelectedProjects, setSelectedProjects } from "@/services/slices/project-slice/projectSlice";
import { StoreRootState } from "@/services/store";
import { ProjectCardLayoutProps } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { buildEditProjectRoute } from '@/constants/route-const';
import { useEffect } from 'react';

const GridCard = ({project, totalProjectCount}: ProjectCardLayoutProps) => {
   const router = useRouter();
   const dispatch = useDispatch();
   const { selectedProjects } = useSelector((state: StoreRootState) => state.projectSlice);
   
   const { id, title, date } = project;
   const projectIsChecked = selectedProjects.includes(id);
   const hasSelectedProjects = selectedProjects.length > 0;

   //Everytime a user re-route to this page, reset the selectedProjects.



   const handleCardClick = () => {
      //If there is any project selected, then we toggle the checkbox on click else we route.
      if (hasSelectedProjects) {
         return dispatch(setSelectedProjects(id));
      }

      return router.push(buildEditProjectRoute(id))
   }


   return (
      <div key={id} >
         <Card aria-disabled={true} 
            className={cn("h-28 shadow-sm overflow-hidden rounded-md cursor-pointer relative min-[360px]:h-36 400:h-40 600:h-44 1000:h-[150px] xl:h-40", {
            "border-[1.5px] border-ring ease-linear duration-75": projectIsChecked
         })}>
            <CardHeader className="absolute top-0 left-0 p-2">
               <Checkbox 
                  id={`project-${id}`} 
                  checked={projectIsChecked}
                  onCheckedChange={() => dispatch(setSelectedProjects(id))}
                  className="w-4 h-4 border-2 border-border shadow-none z-[1] checked:border-primary 400:w-5 400:h-5 lg:w-6 lg:h-6 rounded-sm" 
               />
            </CardHeader>

            
            <CardContent 
               onClick={handleCardClick}
               className='h-full w-full flex items-center justify-center overflow-y-hidden group'
            >
               <div id="resume-preview" className="h-[120%] w-full relative z-0 top-[18px] text-xsm rounded-sm group-hover:scale-105 400:w-[140px] border border-red-400 xl:w-[180px]">

               </div>
            </CardContent>
         </Card>


         <div className="mt-2 flex items-center">
           <TooltipProvider>
               <Tooltip>
                  <TooltipTrigger asChild>
                     <span className="w-full line-clamp-1 text-sm font-semibold">{title}</span>
                  </TooltipTrigger>

                  <TooltipContent align="start" side="bottom">
                     {title}
                  </TooltipContent>
               </Tooltip>
           </TooltipProvider>

         </div>
      </div>
      
   )
};

export default GridCard;
