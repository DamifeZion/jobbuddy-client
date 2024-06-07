import { cn } from "@/lib/utils";
import { navbarConstants } from "@/constants/navbar-const";
import NavbarButton from "@/components/shared/dashboard/navbar/navbar-button";
import { isRouteActive } from "@/util/shared/isRouteActive-util";
import { usePathname } from "next/navigation";
import Link from "next/link";

const BottomNavbar = () => {
   const { menuItems } = navbarConstants;
   const pathname = usePathname();

   const filteredMenuItems = [
      ...menuItems.slice(0, 2),
      ...menuItems.slice(2, 5),
   ];

   return (
      <div className="sticky z-20 bottom-0 bg-background shadow">
         <nav
            style={{ height: navbarConstants.Mobile_Navbar_Height }}
            className="container w-full mx-auto !max-w-4xl flex items-center justify-between"
         >
            {filteredMenuItems.map((data, index) => {
               return (
                  <Link key={index} href={data.href}>
                     <NavbarButton
                        Icon={
                           isRouteActive(pathname, data.href)
                              ? data.activeIcon
                                 ? data.activeIcon
                                 : data.icon
                              : data.icon
                        }
                        className="p-1 h-fit justify-center flex-col gap-px rounded-sm !bg-transparent"
                     >
                        <small
                           className={cn("text-[10px] 400:text-xsm", {
                              "font-semibold": isRouteActive(
                                 pathname,
                                 data.href
                              ),
                           })}
                        >
                           {data.label}
                        </small>
                     </NavbarButton>
                  </Link>
               );
            })}
         </nav>
      </div>
   );
};

export default BottomNavbar;
