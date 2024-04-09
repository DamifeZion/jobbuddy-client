import { FaCrown } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useSelector } from "react-redux";
import { StoreRootState } from "@/services/store";
import { UserProfileCardProp, UserSubscriptionPlanCardProps } from "@/types";
import { Button } from "@/components/ui/button";
import { MultiStepDialog, MultiStepDialogContent, MultiStepDialogTrigger } from "../multi-step/multi-step-dialog";
import { routeConstants } from "@/constants/route-const";

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
   const { currentStep } = useSelector(
      (state: StoreRootState) => state.multiStepSlice
   );

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

         <MultiStepDialog modal >
            <MultiStepDialogTrigger 
               asChild
               steps={routeConstants.authRoute.nestedRoute.tryPremium.steps} 
            >
               <Button size="lg" className="mt-4 gap-3 w-full font-semibold">
                  <FaCrown className="text-premium" /> Go Premium
               </Button>
            </MultiStepDialogTrigger>

            <MultiStepDialogContent>{}</MultiStepDialogContent>
         </MultiStepDialog>
      </div>
   );
};
