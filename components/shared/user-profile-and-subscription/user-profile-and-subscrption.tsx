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
   ...props
}: UserSubscriptionPlanCardProps) => {
   const { user } = useSelector((state: StoreRootState) => state.userSlice);
   const { disableNextButton } = useSelector(
      (state: StoreRootState) => state.multiStepSlice
   );

   const { tryPremiumSteps } = stepConstants.navbar;

   const dispatch = useDispatch();
   const { renderCurrentStepComponent } = useStepComponentManager([
      <h1 key={0}>{tryPremiumSteps[0]}</h1>,
      <h1 key={1}>{tryPremiumSteps[1]}</h1>,
      <h1 key={2}>{tryPremiumSteps[2]}</h1>,
   ]);

   return (
      <div {...props}>
         <div className="px-2 grid grid-cols-[40px_1fr] gap-2 items-center">
            <Avatar className="w-full h-10">
               <AvatarImage
                  src={user?.profile}
                  className="w-full h-full object-cover"
               />

               <AvatarFallback className="w-full h-full text-lg">
                  {user && user.name.slice(0, 1)}
               </AvatarFallback>
            </Avatar>

            <p className="truncate text-start text-sm leading-[1.7]">
               <b>{user && user.name}</b> <br />
               <span className="text-sm capitalize font-medium">
                  {user?.plan} Plan
               </span>
            </p>
         </div>

         <MultiStepDialog>
            <MultiStepDialogTrigger asChild steps={tryPremiumSteps}>
               <Button size="lg" className="mt-4 gap-3 w-full font-semibold">
                  <FaCrown className="text-premium" /> Go Premium
               </Button>
            </MultiStepDialogTrigger>

            <MultiStepDialogContent>
               <MultiStepDialogHeader dynamicStepTitle={false} headerTitle="Try Jobbbudy Pro" />

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
