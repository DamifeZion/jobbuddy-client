import { MultiStepDropdownMenuItem, MultiStepDropdownSubMenuTrigger } from "@/components/shared/multi-step/multi-step-dropdown"
import { routeConstants } from "@/constants/route-const";
import { stepConstants } from "@/constants/step-const";
import { ProjectCardLayoutProps } from "@/types";
import { FiDownload } from "react-icons/fi";
import { HiOutlineExternalLink } from "react-icons/hi"



const DefaultStep = ({project}: ProjectCardLayoutProps) => {
   const { projectItemOptionsSteps: {downloadStep}} = stepConstants.project;
   const { projects: projectRoute } = routeConstants.authRoute.nestedRoute;
   const editProjectRoute = `${projectRoute}/${project.id}/edit`;

   return (
      <>
         <MultiStepDropdownMenuItem
            href={editProjectRoute}
            routing="external"
            target="_blank"
         >
            <HiOutlineExternalLink fontSize={24} /> Open in a new tab
         </MultiStepDropdownMenuItem>

         
         <MultiStepDropdownSubMenuTrigger
         steps={downloadStep}
         >
            <FiDownload fontSize={24} /> Download
         </MultiStepDropdownSubMenuTrigger>
      </>
   )
}

export default DefaultStep;