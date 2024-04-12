import { screenConstants } from "@/constants/screen-const";
import { useMediaQuery } from "@mui/material";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { cn } from "@/lib/utils";
import { useSelector, useDispatch } from "react-redux";
import { StoreRootState } from "@/services/store";
import { Button } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { MultiStepDropdownMenuLabel } from "@/components/shared/multi-step/multi-step-dropdown";

const CardOptions = () => {
   const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
   const { selectedProjects } = useSelector(
      (state: StoreRootState) => state.projectSlice
   );
   const smMobileScreen = useMediaQuery(
      `(max-width: ${screenConstants.SM_Mobile_Screen_PX})`
   );
   const hasSelectedProjects = selectedProjects.length > 0;

   //NOTE: Some named groups are not in this file but in the parent file which is grid-card and list-card
   if (smMobileScreen) {
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
   }

   return (
      <DropdownMenu
         open={dropdownOpen}
         onOpenChange={(open) => {
            setDropdownOpen(open);
         }}
      >
         <DropdownMenuTrigger asChild>
            <Button
               size="icon"
               variant="outline"
               className={cn(
                  "group/options size-6 !m-0 bg-background z-[1] rounded-[calc(var(--radius)_-_6px)] hover:bg-primary sm:size-7 lg:invisible lg:opacity-0 lg:group-hover/card:visible lg:group-hover/card:opacity-100",
                  {
                     "lg:group-hover/card:invisible lg:group-hover/card:opacity-0":
                        hasSelectedProjects,
                     "lg:visible lg:opacity-100 bg-primary text-foreground":
                        dropdownOpen,
                  }
               )}
            >
               <BiDotsHorizontalRounded className="text-foreground size-5/6 group-hover/options:text-white lg:size-5/6" />
            </Button>
         </DropdownMenuTrigger>

         <DropdownMenuContent align="start" className="w-[280px]">
            <MultiStepDropdownMenuLabel>Damife</MultiStepDropdownMenuLabel>
            <DropdownMenuSeparator />
         </DropdownMenuContent>
      </DropdownMenu>
   );
};

export default CardOptions;
