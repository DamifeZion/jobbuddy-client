import { cn } from "@/lib/utils";
import { FootRoom } from "@/components/shared/omniroom/omniroom";
import { navbarConstants } from "@/constants/navbar-const";
import NavbarButton from "@/components/shared/dashboard/navbar/navbar-button";
import { isActiveMenu } from "@/util/shared/isActiveMenu-util";
import { usePathname } from "next/navigation";
import {
   TooltipProvider,
   Tooltip,
   TooltipContent,
   TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { BottomNavbarProp } from "@/types";
import { Separator } from "@/components/ui/separator";

const BottomNavbar = ({
   children,
   childrenPageRoute,
   showChildren = true,
}: BottomNavbarProp) => {
   const { menuItems, extraMenu } = navbarConstants;
   const pathname = usePathname();

   const filteredMenuItems = [
      ...menuItems.slice(0, 2),
      ...extraMenu.slice(0, 1),
      ...menuItems.slice(3, 5),
   ];

   return (
      <FootRoom className="sticky bottom-5 bg-background shadow">
         {/*Note: Below makes sure the below only shows at the bottom of the page when located in that page only, and showChildren for toggle functions. */}
         {children && pathname === childrenPageRoute && showChildren && (
            <>
               <Separator />

               {children}
            </>
         )}

         <Separator />

         <nav
            style={{ height: navbarConstants.Mobile_Navbar_Height }}
            className="container w-full mx-auto max-w-lg flex items-center justify-between"
         >
            {filteredMenuItems.map((data, index) => {
               const isCreateMenu = data.label.toLowerCase() === "create";

               return (
                  <Link key={index} href={data.href}>
                     <TooltipProvider>
                        <Tooltip>
                           <TooltipTrigger>
                              <NavbarButton
                                 Icon={
                                    isActiveMenu(pathname, data.href)
                                       ? data.activeIcon
                                       : data.icon
                                 }
                                 iconClassName={cn("", {
                                    "p-px text-2xl rounded-full border-2 border-foreground min-[512px]:text-[28px] ":
                                       isCreateMenu,
                                 })}
                                 className="p-1 h-fit justify-center flex-col gap-1 text-sm rounded-sm !bg-transparent"
                              >
                                 {!isCreateMenu && (
                                    <small
                                       className={cn(" text-[10px]", {
                                          "font-semibold": isActiveMenu(
                                             pathname,
                                             data.href
                                          ),
                                       })}
                                    >
                                       {data.label}
                                    </small>
                                 )}
                                 <TooltipContent>{data.label}</TooltipContent>
                              </NavbarButton>
                           </TooltipTrigger>
                        </Tooltip>
                     </TooltipProvider>
                  </Link>
               );
            })}
         </nav>
      </FootRoom>
   );
};

export default BottomNavbar;
