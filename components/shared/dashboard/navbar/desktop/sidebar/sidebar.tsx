import { cn } from "@/lib/utils";
import NavbarButton from "../../navbar-button";
import { navbarConstants } from "@/constants/navbar-const";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isActiveMenu } from "@/util/shared/isActiveMenu-util";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserSubscriptionPlanCard } from "@/components/shared/user-profile-and-subscription/user-profile-and-subscrption";

const SideBar = () => {
   const pathname = usePathname();
   const { menuItems, Mobile_Navbar_Height } = navbarConstants;

   return (
      <aside
         style={{ paddingTop: Mobile_Navbar_Height }}
         className={cn("w-[270px] max-w-xs h-screen fixed top-0 left-0 z-20")}
      >
         <div className="pt-10 w-full h-full flex flex-col overflow-y-auto">
            <div className="px-4">
               <UserSubscriptionPlanCard />
            </div>

            <menu className="px-3 mt-8 mb-2 flex flex-col gap-2">
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
               {/* <Separator /> */}

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
      </aside>
   );
};

export default SideBar;
