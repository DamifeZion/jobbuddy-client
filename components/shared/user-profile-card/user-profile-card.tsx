import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useSelector } from "react-redux";
import { StoreRootState } from "@/services/store";
import { UserProfileCardProp } from "@/types";

const UserProfileCard = ({ className }: UserProfileCardProp) => {
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
               {user && user.name.slice(0, 1)}
            </AvatarFallback>
         </Avatar>

         <p className="truncate text-start leading-tight">
            <b>{user && user.name}</b> <br />
            <span className="text-xsm">{user && user.email}</span>
         </p>
      </div>
   );
};

export default UserProfileCard;
