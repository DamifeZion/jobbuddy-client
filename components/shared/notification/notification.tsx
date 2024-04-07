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

const Notification = () => {
   const { notificationIsOpen } = useSelector(
      (state: StoreRootState) => state.navbarSlice
   );
   const mobileScreen = useMediaQuery("(max-width: 1023px)");
   const dispatch = useDispatch();
   const unreadMessagesCount = countUnreadMessages(
      navbarConstants.notifications
   );

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
                           className={cn("", {
                              hidden: notificationIsOpen,
                           })}
                        >
                           <span>Notifications</span>
                        </TooltipContent>
                     </Tooltip>
                  </div>
               </PopoverTrigger>

               <PopoverContent
                  align={mobileScreen ? "center" : "start"}
                  style={{
                     top: navbarConstants.Mobile_Navbar_Height,
                     height: `calc(100vh - ${navbarConstants.Mobile_Navbar_Height})`,
                  }}
                  className="w-screen mt-2 mr-2 p-0 space-y-1 rounded-t-none overflow-y-auto 500:w-[350px] 500:max-h-[calc(100vh_-_170px)] 500:mr-8 500:mt-0 500:rounded-t-md  "
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
