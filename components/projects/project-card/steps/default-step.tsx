import { AiOutlineLink } from "react-icons/ai";
import {
   MultiStepDropdownMenuItem,
   MultiStepDropdownSubMenuTrigger,
} from "@/components/shared/multi-step/multi-step-dropdown";
import { routeConstants } from "@/constants/route-const";
import { stepConstants } from "@/constants/step-const";
import { StoreRootState } from "@/services/store";
import { FiDownload } from "react-icons/fi";
import { HiOutlineExternalLink } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useClipboard } from "@/hooks/shared/useClipboard";
import { toast } from "sonner";
import { FormErrorProps } from "@/types";

const DefaultStep = () => {
   const { copyTextToClipboard } = useClipboard();
   const { activeProject } = useSelector(
      (state: StoreRootState) => state.projectSlice
   );
   const { copied } = useSelector(
      (state: StoreRootState) => state.clipboardSlice
   );
   const {
      projectItemOptionsSteps: { downloadStep },
   } = stepConstants.project;
   const {
      authRoute: {
         nestedRoute: { editProject },
      },
      unAuthRoute: {
         project: { publicProjectView },
      },
   } = routeConstants;
   const editProjectRoute = `${editProject.replace(":id", activeProject.id)}`;
   const publicViewProjectRoute = `${publicProjectView.replace(":id", activeProject.id)}`;

   const handleCopyLinkClick = () => {
      const href = `${window.location.origin}${publicViewProjectRoute}`;
      copyTextToClipboard(href);
      copied.success ? toast.success(copied.msg) : toast.error(copied.msg);
   };

   return (
      <>
         <MultiStepDropdownMenuItem
            href={editProjectRoute}
            routing="external"
            target="_blank"
         >
            <HiOutlineExternalLink fontSize={24} /> Open in a new tab
         </MultiStepDropdownMenuItem>

         <MultiStepDropdownSubMenuTrigger steps={downloadStep}>
            <FiDownload fontSize={24} /> Download
         </MultiStepDropdownSubMenuTrigger>

         <MultiStepDropdownMenuItem onClick={handleCopyLinkClick}>
            <AiOutlineLink fontSize={24} />
            Copy link
         </MultiStepDropdownMenuItem>
      </>
   );
};

export default DefaultStep;
