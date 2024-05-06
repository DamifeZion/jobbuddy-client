"use client";
import { StoreRootState } from "@/services/store";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardDescription, CardHeader } from "../ui/card";
import { useSelector } from "react-redux";

const Header = () => {
   const { user } = useSelector((state: StoreRootState) => state.userSlice);

   return (
      <Card className="mx-auto pt-20 max-w-screen-1500 w-full overflow-hidden">
         <div className="gradient-primary-1  px-4 h-fit flex items-center justify-center text-center text-balance text-primary-foreground md:px-6">
            <div className="flex flex-col items-center relative -top-10 [&_p]:text-md">
               <Avatar
                  className="
                  size-24 border-[3px] border-primary-foreground 400:size-28
               "
               >
                  <AvatarImage
                     src={user?.profile}
                     className="w-full h-full object-cover"
                  />
                  <AvatarFallback className="text-3xl text-foreground">
                     {user && user?.name.slice(0, 2)}
                  </AvatarFallback>
               </Avatar>

               <h3
                  className="
                  mt-3 text-2xl font-medium 
                  400:text-[26px]
               "
               >
                  {user?.name}
               </h3>

               <p>Experience: 1year Experience</p>
               <p>Location: Lagos, Nigeria</p>
            </div>
         </div>
      </Card>
   );
};

export default Header;
