import { RiFeedbackLine } from "react-icons/ri";
import { IoLanguageOutline } from "react-icons/io5";
import { BsMoonStars } from "react-icons/bs";
import { navbarConstants } from "@/constants/navbar-const";
import { MdOutlineLogout } from "react-icons/md";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Image from "next/image";
import { HeadRoom } from "@/components/shared/omniroom/omniroom";
import { routeConstants } from "@/constants/route-const";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { StoreRootState } from "@/services/store";
import {
   DropdownMenu,
   DropdownMenuTrigger,
   DropdownMenuContent,
   DropdownMenuGroup,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuSub,
   DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import Notification from "@/components/shared/notification/notification";
import { logOut } from "@/services/slices/user-slice/userSlice";
import UserProfileCard from "@/components/shared/user-profile-card/user-profile-card";
import {
   AnimatedDropdown,
   MyDropdownMenuItem,
   MyDropdownMenuSubTrigger,
} from "@/components/shared/my-dropdown-menu/my-dropdown";
import { useActualTheme } from "@/hooks/shared/useActualTheme";
import { setAppearanceOpen } from "@/services/slices/navbar-slice/navbarSlice";

const MobileNavbar = () => {
   const { theme, setTheme } = useTheme();
   const actualTheme = useActualTheme();
   const dispatch = useDispatch();
   const { user } = useSelector((state: StoreRootState) => state.userSlice);
   const { appearanceIsOpen } = useSelector(
      (state: StoreRootState) => state.navbarSlice
   );
   const { unAuthRoute } = routeConstants;
   const { menuItems, extraMenu } = navbarConstants;

   const filteredMenuItems = [
      ...extraMenu.slice(1, 2),
      ...menuItems.slice(4, 5),
   ];

   return (
      <HeadRoom className="sticky">
         <nav
            style={{ height: navbarConstants.Mobile_Navbar_Height }}
            className={cn(
               "container w-full flex items-center justify-between bg-background border-b border-border"
            )}
         >
            <Link href={unAuthRoute.main} id="logo">
               <Image
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

            <menu className="flex items-center gap-5">
               <Notification />

               <DropdownMenu
                  onOpenChange={(isOpen) =>
                     !isOpen && dispatch(setAppearanceOpen(isOpen))
                  }
               >
                  <DropdownMenuTrigger asChild>
                     <Avatar className="w-10 h-10">
                        <AvatarImage
                           src={user?.profile}
                           className="w-full h-full object-cover"
                        />
                        <AvatarFallback className="text-lg">
                           {user && user.name.slice(0, 2)}
                        </AvatarFallback>
                     </Avatar>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                     align="start"
                     style={{
                        maxHeight: `calc(100vh - ${navbarConstants.Mobile_Navbar_Height})`,
                     }}
                     className="w-screen pb-2 mr-2 overflow-y-auto space-y-1 300:w-[250px]"
                  >
                     <DropdownMenuLabel>
                        <Link
                           href={routeConstants.authRoute.nestedRoute.profile}
                        >
                           <UserProfileCard />
                        </Link>
                     </DropdownMenuLabel>

                     <DropdownMenuSeparator />

                     <DropdownMenuGroup>
                        {filteredMenuItems.map((data, index) => {
                           return (
                              <Link key={index} href={data.href}>
                                 <MyDropdownMenuItem Icon={data.icon}>
                                    {data.label}
                                 </MyDropdownMenuItem>
                              </Link>
                           );
                        })}
                     </DropdownMenuGroup>

                     <DropdownMenuSeparator />

                     <DropdownMenuGroup>
                        <DropdownMenuSub>
                           <MyDropdownMenuSubTrigger
                              active={appearanceIsOpen}
                              Icon={BsMoonStars}
                              iconClassName="text-lg"
                              onClick={() => dispatch(setAppearanceOpen(null))}
                           >
                              <span className="capitalize">
                                 Appearance: {theme}
                              </span>
                           </MyDropdownMenuSubTrigger>

                           <AnimatedDropdown open={appearanceIsOpen}>
                              <DropdownMenuGroup className="pt-1">
                                 <DropdownMenuCheckboxItem
                                    checked={theme === "light"}
                                    onCheckedChange={() => setTheme("light")}
                                 >
                                    Light
                                 </DropdownMenuCheckboxItem>

                                 <DropdownMenuCheckboxItem
                                    checked={theme === "dark"}
                                    onCheckedChange={() => setTheme("dark")}
                                 >
                                    Dark
                                 </DropdownMenuCheckboxItem>

                                 <DropdownMenuCheckboxItem
                                    checked={theme === "system"}
                                    onCheckedChange={() => setTheme("system")}
                                 >
                                    System
                                 </DropdownMenuCheckboxItem>
                              </DropdownMenuGroup>
                           </AnimatedDropdown>
                        </DropdownMenuSub>

                        <MyDropdownMenuItem Icon={IoLanguageOutline} disabled>
                           Language: English
                        </MyDropdownMenuItem>

                        <MyDropdownMenuItem
                           Icon={RiFeedbackLine}
                           onClick={() =>
                              alert(
                                 "Show a dialog and allow user fill form to send feedback"
                              )
                           }
                        >
                           Send Feedback
                        </MyDropdownMenuItem>
                     </DropdownMenuGroup>

                     <DropdownMenuSeparator />

                     <MyDropdownMenuItem
                        onClick={() => dispatch(logOut())}
                        Icon={MdOutlineLogout}
                     >
                        Sign Out
                     </MyDropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            </menu>
         </nav>
      </HeadRoom>
   );
};

export default MobileNavbar;
