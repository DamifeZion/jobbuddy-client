import { RiFeedbackLine } from "react-icons/ri";
import { MdOutlineLogout } from "react-icons/md";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { cn } from "@/lib/utils";
import NavbarButton from "../../navbar-button";
import { navbarConstants } from "@/constants/navbar-const";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import Notification from "@/components/shared/notification/notification";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { logOut } from "@/services/slices/user-slice/userSlice";
import { isActiveMenu } from "@/util/shared/isActiveMenu-util";
import { routeConstants } from "@/constants/route-const";
import UserProfileCard from "@/components/shared/user-profile-card/user-profile-card";
import { disableBodyScrolling } from "@/util/shared/disable-body-scrolling-util";
import { useActualTheme } from "@/hooks/shared/useActualTheme";

const SideBar = () => {
   const pathname = usePathname();
   const actualTheme = useActualTheme();
   const dispatch = useDispatch();
   const { unAuthRoute } = routeConstants;
   const { menuItems, extraMenu } = navbarConstants;

   return (
      <aside
         className={cn("w-[270px] max-w-xs h-screen fixed left-0 top-0 z-40")}
      >
         <div className="w-full h-full flex flex-col border border-border ">
            <div className="mt-6 flex justify-between">
               <Link href={unAuthRoute.main} id="logo" className="px-6">
                  <Image
                     id="logo"
                     src={
                        actualTheme === "dark"
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

            <div className="mt-6 pt-2 flex flex-col flex-grow overflow-y-auto ">
               <menu className="flex flex-col gap-1 mb-2 px-3">
                  {menuItems.map((data, index) => {
                     return (
                        <Link key={index} href={data.href}>
                           <NavbarButton
                              variant={
                                 isActiveMenu(pathname, data.href)
                                    ? "secondary"
                                    : "ghost"
                              }
                              Icon={
                                 isActiveMenu(pathname, data.href)
                                    ? data.activeIcon
                                    : data.icon
                              }
                           >
                              <li
                                 className={cn("", {
                                    "font-semibold": isActiveMenu(
                                       pathname,
                                       data.href
                                    ),
                                 })}
                              >
                                 {data.label}
                              </li>
                           </NavbarButton>
                        </Link>
                     );
                  })}
               </menu>

               <div className="mt-auto w-full">
                  <Separator />

                  <div className="px-3">
                     <Popover
                        onOpenChange={(open) => disableBodyScrolling(open)}
                     >
                        <PopoverTrigger asChild>
                           <Button
                              variant="ghost"
                              className="h-fit py-2 my-3 w-full grid grid-cols-[1fr_25px] items-center justify-between rounded-lg"
                           >
                              <UserProfileCard />

                              <BiDotsHorizontalRounded className="ml-1 w-full h-full" />
                           </Button>
                        </PopoverTrigger>

                        <PopoverContent className="w-[240px] mb-1 space-y-1 p-3">
                           {extraMenu.slice(1, 2).map((data, index) => (
                              <Link key={index} href={data.href}>
                                 <NavbarButton
                                    Icon={
                                       isActiveMenu(pathname, data.href)
                                          ? data.activeIcon
                                          : data.icon
                                    }
                                    className="h-10 text-md"
                                 >
                                    {data.label}
                                 </NavbarButton>
                              </Link>
                           ))}

                           <NavbarButton
                              onClick={() =>
                                 alert(
                                    "Show a dialog and allow user fill form to send feedback"
                                 )
                              }
                              Icon={RiFeedbackLine}
                              className="h-10 text-md"
                           >
                              Send Feedback
                           </NavbarButton>

                           <NavbarButton
                              onClick={() => dispatch(logOut())}
                              Icon={MdOutlineLogout}
                              className="h-10 text-md"
                           >
                              Sign Out
                           </NavbarButton>
                        </PopoverContent>
                     </Popover>
                  </div>
               </div>
            </div>
         </div>
      </aside>
   );
};

export default SideBar;
