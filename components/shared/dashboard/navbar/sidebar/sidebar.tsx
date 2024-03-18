import { MdOutlineLogout } from "react-icons/md";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { cn } from "@/lib/utils";
import SidebarButton from "./sidebar-button";
import { navbarConstants } from "@/constants/navbar-const";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Separator } from "@/components/ui/separator";
import Notification from "@/components/shared/notification/notification";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { StoreRootState } from "@/services/store";
import { logOut } from "@/services/slices/user-slice/userSlice";
import { isActiveMenu } from "@/util/shared/isActiveMenu-util";
import { routeConstants } from "@/constants/route-const";

const SideBar = () => {
   const pathname = usePathname();
   const { theme } = useTheme();
   const { user } = useSelector((state: StoreRootState) => state.userSlice);
   const dispatch = useDispatch();
   const { unAuthRoute } = routeConstants;

   return (
      <aside
         className={cn("w-[270px] max-w-xs h-screen fixed left-0 top-0 z-40")}
      >
         <div className="w-full h-full py-4 flex flex-col border border-border ">
            <div className="flex justify-between">
               <Link href={unAuthRoute.main} id="logo" className="px-6">
                  <Image
                     id="logo"
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

               <Notification />
            </div>

            <div className="py-8 flex flex-col flex-grow mb-14">
               <menu className="flex flex-col flex-grow gap-1 mb-2 px-3">
                  {navbarConstants.menuItems.map((data, index) => {
                     return (
                        <Link key={index} href={data.href}>
                           <SidebarButton
                              variant={
                                 isActiveMenu(pathname, data.href)
                                    ? "secondary"
                                    : "ghost"
                              }
                              LeftIcon={
                                 isActiveMenu(pathname, data.href)
                                    ? data.activeIcon
                                    : data.icon
                              }
                           >
                              <li
                                 className={cn("text-xl", {
                                    "font-semibold": isActiveMenu(
                                       pathname,
                                       data.href
                                    ),
                                 })}
                              >
                                 {data.label}
                              </li>
                           </SidebarButton>
                        </Link>
                     );
                  })}
               </menu>

               <div className="absolute left-0 mb-4 bottom-12 w-full ">
                  <Separator className="px-3">
                     <Popover>
                        <PopoverTrigger asChild>
                           <Button
                              variant="ghost"
                              className="my-2 w-full justify-between h-12 rounded-lg"
                           >
                              <div className="flex items-center gap-2">
                                 <Avatar className="h-10 w-10">
                                    <AvatarImage
                                       src={user?.profile}
                                       className="w-full h-full object-cover"
                                    />

                                    <AvatarFallback className="text-lg">
                                       {user && user.name.slice(0, 1)}
                                    </AvatarFallback>
                                 </Avatar>

                                 <h1 className="truncate text-start w-[130px]">
                                    {user && user.name}
                                 </h1>
                              </div>

                              <BiDotsHorizontalRounded size={23} />
                           </Button>
                        </PopoverTrigger>

                        <PopoverContent className="w-[240px] mb-2 space-y-1 rounded-lg">
                           {navbarConstants.extraMenu.map((data, index) => (
                              <Link
                                 key={index}
                                 href={`${data.href}/${user?._id}`}
                              >
                                 <SidebarButton
                                    LeftIcon={
                                       isActiveMenu(pathname, data.href)
                                          ? data.activeIcon
                                          : data.icon
                                    }
                                 >
                                    Profile
                                 </SidebarButton>
                              </Link>
                           ))}

                           <SidebarButton
                              onClick={() => dispatch(logOut())}
                              LeftIcon={MdOutlineLogout}
                           >
                              Log Out
                           </SidebarButton>
                        </PopoverContent>
                     </Popover>
                  </Separator>
               </div>
            </div>
         </div>
      </aside>
   );
};

export default SideBar;
