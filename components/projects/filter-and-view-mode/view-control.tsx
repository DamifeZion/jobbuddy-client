import { CiCircleList } from "react-icons/ci";
import { IoGridOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { toggleViewMode } from "@/services/slices/project-slice/projectSlice";
import { StoreRootState } from "@/services/store";
import { useSelector, useDispatch } from "react-redux";
import {
   TooltipProvider,
   Tooltip,
   TooltipTrigger,
   TooltipContent,
} from "@/components/ui/tooltip";

const ViewControl = () => {
   const dispatch = useDispatch();
   const { viewMode } = useSelector(
      (state: StoreRootState) => state.projectSlice
   );

   return (
      <TooltipProvider>
         <Tooltip>
            <TooltipTrigger asChild>
               <Button
                  variant="secondary"
                  onClick={() => dispatch(toggleViewMode())}
                  className="px-0 py-0 w-9 h-9 rounded-sm shadow-sm border"
               >
                  {viewMode === "grid" ? (
                     <CiCircleList strokeWidth={0.3} className="w-6 h-6" />
                  ) : (
                     <IoGridOutline className="w-6 h-6" />
                  )}
               </Button>
            </TooltipTrigger>

            <TooltipContent className="max-sm:hidden">
               <p>View as {viewMode === "grid" ? "list" : "grid"}</p>
            </TooltipContent>
         </Tooltip>
      </TooltipProvider>
   );
};

export default ViewControl;
