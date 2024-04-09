import { cn } from "@/lib/utils";
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "@/components/ui/tooltip";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover";
import { navbarConstants } from "@/constants/navbar-const";
import NotificationContent from "@/components/shared/notification/notification-contents";
import { setNotificationOpen } from "@/services/slices/navbar-slice/navbarSlice";
import { StoreRootState } from "@/services/store";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { IoMdNotificationsOutline, IoMdNotifications } from "react-icons/io";
import { countUnreadMessages } from "@/util/shared/notification-util";
import { useMediaQuery } from "@mui/material";
import { disableBodyScrolling } from "@/util/shared/disable-body-scrolling-util";
import { screenConstants } from "@/constants/screen-const";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

const Notification = () => {
   const { notificationIsOpen } = useSelector(
      (state: StoreRootState) => state.navbarSlice
   );
   const smMobileScreen = useMediaQuery(
      `(max-width: ${screenConstants.SM_Mobile_Screen_PX})`
   );
   const dispatch = useDispatch();
   const unreadMessagesCount = countUnreadMessages(
      navbarConstants.notifications
   );

   //=== MOBILE VIEW (640px) BEGINS ===//
   if (smMobileScreen) {
      return (
         <span
            className={cn(
               "flex items-center justify-center h-10 w-10 rounded-full bg-transparent hover:text-muted-foreground"
            )}
         >
            <Drawer
               onOpenChange={(open) => {
                  dispatch(setNotificationOpen(open));
               }}
            >
               <DrawerTrigger asChild>
                  <Button
                     size="icon"
                     variant="ghost"
                     className="text-[30px] w-10 h-10 rounded-full relative"
                  >
                     {notificationIsOpen ? (
                        <IoMdNotifications />
                     ) : (
                        <IoMdNotificationsOutline />
                     )}

                     <span
                        className={cn(
                           "flex items-center justify-center px-[6px] !text-white text-xsm absolute top-1 -left-0 rounded-full bg-skyBlue",
                           {
                              "opacity-0": !unreadMessagesCount,
                           }
                        )}
                     >
                        {unreadMessagesCount}
                     </span>
                  </Button>
               </DrawerTrigger>

               <DrawerContent showLine={false} className="w-full space-y-1 p-0">
                  <NotificationContent
                     isLoading={false}
                     notifications={navbarConstants.notifications}
                  />
               </DrawerContent>
            </Drawer>
         </span>
      );
   }
   //=== MOBILE VIEW (640px) ENDS ===//

   //==== LARGER SCREEN VIEW BEGINS ===//
   return (
      <span
         className={cn(
            "flex items-center justify-center h-10 w-10 rounded-full bg-transparent hover:text-muted-foreground"
         )}
      >
         <TooltipProvider>
            <Popover
               onOpenChange={(open) => {
                  dispatch(setNotificationOpen(open));
                  disableBodyScrolling(open);
               }}
            >
               <PopoverTrigger asChild>
                  <div>
                     <Tooltip>
                        <TooltipTrigger asChild>
                           <Button
                              size="icon"
                              variant="ghost"
                              className="text-[30px] w-10 h-10 rounded-full relative"
                           >
                              {notificationIsOpen ? (
                                 <IoMdNotifications />
                              ) : (
                                 <IoMdNotificationsOutline />
                              )}

                              <span
                                 className={cn(
                                    "flex items-center justify-center px-[6px] !text-white text-xsm absolute top-1 -left-0 rounded-full bg-skyBlue",
                                    {
                                       "opacity-0": !unreadMessagesCount,
                                    }
                                 )}
                              >
                                 {unreadMessagesCount}
                              </span>
                           </Button>
                        </TooltipTrigger>

                        <TooltipContent
                           className={cn("max-lg:hidden ", {
                              hidden: notificationIsOpen,
                           })}
                        >
                           <span>Notifications</span>
                        </TooltipContent>
                     </Tooltip>
                  </div>
               </PopoverTrigger>

               <PopoverContent
                  align="start"
                  side="left"
                  className="w-fit h-fit mr-2 p-0 space-y-1 500:w-[380px] overflow-hidden"
               >
                  <NotificationContent
                     isLoading={false}
                     notifications={navbarConstants.notifications}
                  />
               </PopoverContent>
            </Popover>
         </TooltipProvider>
      </span>
   );
};

export default Notification;
