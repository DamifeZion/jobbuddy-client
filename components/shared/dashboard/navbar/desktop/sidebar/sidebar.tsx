import { cn } from "@/lib/utils";
import NavbarButton from "../../navbar-button";
import { navbarConstants } from "@/constants/navbar-const";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isActiveMenu } from "@/util/shared/isActiveMenu-util";
import { Button } from "@/components/ui/button";
import { UserSubscriptionPlanCard } from "@/components/shared/user-profile-and-subscrption";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import { StoreRootState } from "@/services/redux-provider/store";
import { setRetractSidebar } from "@/services/slices/dashboard/navbar-slice/navbarSlice";
import {
   Tooltip,
   TooltipContent,
   TooltipTrigger,
} from "@/components/ui/tooltip";

const SideBar = () => {
   const dispatch = useDispatch();
   const pathname = usePathname();
   const { menuItems, Mobile_Navbar_Height } = navbarConstants;
   const { retractSidebar } = useSelector(
      (state: StoreRootState) => state.navbarSlice
   );

   const handleResizeSidebarClick = () => {
      dispatch(setRetractSidebar());
   };

   return (
      <aside>
         <div
            style={{ paddingTop: Mobile_Navbar_Height }}
            className={cn(
               "group/main w-[270px] max-w-xs h-screen fixed top-0 left-0 z-20 border-r flex flex-col transition-all ease-linear duration-100",
               {
                  "w-[70px]": retractSidebar,
               }
            )}
         >
            <div className="mt-10 px-3 relative">
               <UserSubscriptionPlanCard sidebarRetracted={retractSidebar} />

               <Tooltip>
                  <TooltipTrigger asChild>
                     <Button
                        id="resize-sidebar-panel"
                        variant="outline"
                        size="icon"
                        onClick={handleResizeSidebarClick}
                        className="size-7 absolute top-8 -right-3 focus:ring-2 focus:ring-ring transition-opacity ease-in-out duration-300 opacity-0 invisible group-hover/main:opacity-100  group-hover/main:visible"
                     >
                        {retractSidebar ? (
                           <ChevronRightIcon className="size-5" />
                        ) : (
                           <ChevronLeftIcon className="size-5" />
                        )}
                     </Button>
                  </TooltipTrigger>

                  <TooltipContent side="right">
                     Toggle Navigation
                  </TooltipContent>
               </Tooltip>
            </div>

            <div className="mt-8 w-full flex-grow flex flex-col overflow-y-auto">
               <menu className="px-3 mb-2 flex flex-col gap-2">
                  {menuItems.slice(0, 4).map((data, index) => {
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
                                       ? data.activeIcon
                                       : data.icon
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

               <div className="mt-auto pb-4 space-y-2">
                  <div className="px-3">
                     {menuItems.slice(4, 5).map((data, index) => {
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
                                          ? data.activeIcon
                                          : data.icon
                                       : data.icon
                                 }
                              >
                                 <li
                                    className={cn("list-none", {
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
                  </div>
               </div>
            </div>
         </div>
      </aside>
   );
};

export default SideBar;
