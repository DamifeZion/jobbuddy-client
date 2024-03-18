import { navbarConstants } from "@/constants/navbar-const";
import { MdOutlineLogout } from "react-icons/md";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Image from "next/image";
import Headroom from "react-headroom";
import { routeConstants } from "@/constants/route-const";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { StoreRootState } from "@/services/store";
import { usePathname } from "next/navigation";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover";
import Notification from "@/components/shared/notification/notification";
import SidebarButton from "./sidebar/sidebar-button";
import { logOut } from "@/services/slices/user-slice/userSlice";
import { Separator } from "@/components/ui/separator";

const MobileNavbar = () => {
   const { theme } = useTheme();
   const pathname = usePathname();
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

               <Popover>
                  <PopoverTrigger>
                     <Avatar className="w-10 h-10">
                        <AvatarImage
                           src={user?.profile}
                           className="w-full h-full object-cover"
                        />
                        <AvatarFallback className="text-lg">
                           {user && user.name.slice(0, 2)}
                        </AvatarFallback>
                     </Avatar>
                  </PopoverTrigger>

                  <PopoverContent align="center" className="max-w-[220px] mt-2 mr-2 p-3 max-h-[440px] overflow-y-auto  landscape:max-h-[70vh]">
                     <p className='px-3 font-semibold'>Account</p>

                     <Separator className='mt-2 mb-3' />

                     <div className='grid gap-3'>
                        {navbarConstants.extraMenu.map((data, index) => {
                           const isActive = pathname === data.href;

                           return (
                              <Link key={index} href={data.href}>
                                 <SidebarButton
                                    LeftIcon={
                                       isActive ? data.activeIcon : data.icon
                                    }
                                    className='h-9 text-md'
                                    variant={isActive ? "secondary" : "ghost"}
                                 >
                                    {data.label}
                                 </SidebarButton>
                              </Link>
                           );
                        })}

                        <SidebarButton
                           onClick={() => dispatch(logOut())}
                           LeftIcon={MdOutlineLogout}
                           className="h-9 text-md hover:bg-destructive hover:text-destructive-foreground"
                        >
                           Log Out
                        </SidebarButton>
                     </div>
                  </PopoverContent>
               </Popover>
            </menu>
         </nav>
      </Headroom>
   );
};

export default MobileNavbar;
