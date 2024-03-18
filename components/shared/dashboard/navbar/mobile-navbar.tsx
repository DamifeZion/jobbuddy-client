import { navbarConstants } from "@/constants/navbar-const";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Image from "next/image";
import Headroom from "react-headroom";
import { routeConstants } from "@/constants/route-const";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { StoreRootState } from "@/services/store";
import { Button } from "@/components/ui/button";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover";
import Notification from "@/components/shared/notification/notification";

const MobileNavbar = () => {
   const { theme } = useTheme();
   const dispatch = useDispatch();
   const { user } = useSelector((state: StoreRootState) => state.userSlice);
   const { unAuthRoute } = routeConstants;

   return (
      <Headroom className="bottom-0">
         <nav
            style={{ height: navbarConstants.Mobile_Navbar_Height }}
            className={cn(
               "w-full px-8 flex items-center justify-between backdrop-blur-lg border-b border-border"
            )}
         >
            <Link href={unAuthRoute.main} id="logo">
               <Image
                  src={
                     theme === "dark"
                        ? navbarConstants.logo.dark
                        : navbarConstants.logo.light
                  }
                  alt=""
                  width={130}
                  height={130}
                  priority
               />
            </Link>

            <menu className="flex items-center gap-5">
               <Notification />

               <Avatar className="w-10 h-10">
                  <AvatarImage
                     src={user?.profile}
                     className="w-full h-full object-cover"
                  />
                  <AvatarFallback className="text-lg">
                     {user && user.name.slice(0, 2)}
                  </AvatarFallback>
               </Avatar>
            </menu>
         </nav>
      </Headroom>
   );
};

export default MobileNavbar;
