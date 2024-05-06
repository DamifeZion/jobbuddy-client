import { FaCrown } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { StoreRootState } from "@/services/store";
import { UserProfileCardProp, UserSubscriptionPlanCardProps } from "@/types";
import { Button } from "@/components/ui/button";
import { useStepComponentManager } from "@/hooks/shared/useStepComponentManager";
import { stepConstants } from "@/constants/step-const";
import {
   MultiStepDialog,
   MultiStepDialogContent,
   MultiStepDialogHeader,
   MultiStepDialogTrigger,
} from "../multi-step/multi-step-dialog";
import { nextStep } from "@/services/slices/multi-step-slice/multi-step-slice";
import { DialogFooter } from "@/components/ui/dialog";
import {
   TooltipContent,
   Tooltip,
   TooltipProvider,
   TooltipTrigger,
} from "@/components/ui/tooltip";

export const UserProfileCard = ({ className }: UserProfileCardProp) => {
   const { user } = useSelector((state: StoreRootState) => state.userSlice);

   return (
      <div
         className={cn(
            "grid grid-cols-[40px_1fr] gap-2 items-center",
            className
         )}
      >
         <Avatar className="w-full h-10">
            <AvatarImage
               src={user?.profile}
               className="w-full h-full object-cover"
            />

            <AvatarFallback className="w-full h-full text-lg">
               {user?.name.slice(0, 1)}
            </AvatarFallback>
         </Avatar>

         <p className="truncate text-start leading-tight">
            <b>{user && user.name}</b> <br />
            <span className="text-xsm">{user?.email}</span>
         </p>
      </div>
   );
};

export const UserSubscriptionPlanCard = ({
   className,
   sidebarRetracted,
   ...props
}: UserSubscriptionPlanCardProps) => {
   const { user } = useSelector((state: StoreRootState) => state.userSlice);
   const { disableNextButton } = useSelector(
      (state: StoreRootState) => state.multiStepSlice
   );

   const { tryPremiumSteps } = stepConstants.navbar;

   const dispatch = useDispatch();
   //REFACTOR: We dont need useStepComponentManager anymore. use a switch case.
   const { renderCurrentStepComponent } = useStepComponentManager([
      <h1 key={0}>{tryPremiumSteps[0]}</h1>,
      <h1 key={1}>{tryPremiumSteps[1]}</h1>,
      <h1 key={2}>{tryPremiumSteps[2]}</h1>,
   ]);

   return (
      <div {...props}>
         <div
            className={cn("px-2 grid grid-cols-[40px_1fr] gap-2 items-center", {
               "px-0 grid-cols-1 justify-center": sidebarRetracted,
            })}
         >
            <Avatar
               className={cn("w-full h-10", {
                  "size-[44px]": sidebarRetracted,
               })}
            >
               <AvatarImage
                  src={user?.profile}
                  className="w-full h-full object-cover"
               />

               <AvatarFallback className="w-full h-full text-lg">
                  {user && user.name.slice(0, 1)}
               </AvatarFallback>
            </Avatar>

            {!sidebarRetracted && (
               <p className="truncate text-start text-sm leading-[1.7]">
                  <b>{user && user.name}</b> <br />
                  <span className="text-sm capitalize font-medium">
                     {user?.plan} Plan
                  </span>
               </p>
            )}
         </div>

         <MultiStepDialog>
            <TooltipProvider>
               <Tooltip>
                  <MultiStepDialogTrigger asChild steps={tryPremiumSteps}>
                     <TooltipTrigger asChild>
                        <Button
                           size={sidebarRetracted ? "icon" : "lg"}
                           className={cn("mt-4 gap-3 w-full font-semibold", {
                              "mt-8 px-0 w-full": sidebarRetracted,
                           })}
                        >
                           <FaCrown
                              className={cn("text-premium", {
                                 "size-5": sidebarRetracted,
                              })}
                           />

                           {!sidebarRetracted && <span>Go Premium</span>}
                        </Button>
                     </TooltipTrigger>
                  </MultiStepDialogTrigger>

                  {sidebarRetracted && (
                     <TooltipContent side="right">Go Premium</TooltipContent>
                  )}
               </Tooltip>
            </TooltipProvider>

            <MultiStepDialogContent>
               <MultiStepDialogHeader
                  dynamicStepTitle={false}
                  header="Try Jobbbudy Pro"
               />

               {renderCurrentStepComponent()}

               <DialogFooter>
                  <Button
                     disabled={disableNextButton}
                     onClick={() => dispatch(nextStep())}
                  >
                     Next
                  </Button>
               </DialogFooter>
            </MultiStepDialogContent>
         </MultiStepDialog>
      </div>
   );
};
