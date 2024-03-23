import { NotificationSliceProp } from "@/types";
import { InView } from "react-intersection-observer";
import { countUnreadMessages } from "@/util/shared/notification-util";
import moment from "moment";
import { CgClose } from "react-icons/cg";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import LoadingNotification from "./loading-notification";

const NotificationItems = ({
   isLoading,
   notifications,
}: NotificationSliceProp) => {
   const unreadMessagesCount = countUnreadMessages(notifications);

   const markAsRead = (isViewed: boolean, notificationId: string) => {
      if (isViewed === true) return;

      // Update the notification read status here
      console.log(
         "Update the notification Read status to 'true' for id: ",
         notificationId
      );
   };

   const deleteNotification = (notificationId: string) => {
      // Delete the selected notification here
      console.log("Delete the notification for id: ", notificationId);
   };

   // If it is loading, show the skeleton notification
   if (isLoading) {
      return <LoadingNotification />;
   }

   return (
      <div>
         {[
            // Sort the array to show the "unread" first then the "read"
            ...notifications.filter((notification) => !notification.viewed),
            ...notifications.filter((notification) => notification.viewed),
         ].map((notification) => {
            return (
               <InView
                  as="div"
                  key={notification._id}
                  triggerOnce
                  onChange={(inView) => markAsRead(inView, notification._id)}
                  className={cn(
                     "py-4 grid grid-cols-[25px_1fr_25px] items-start first:pt-0 last:pb-0",
                     {
                        "grid-cols-[1fr]": !unreadMessagesCount,
                     }
                  )}
               >
                  <span
                     className={cn(
                        "flex h-2 w-2 translate-y-1 rounded-full bg-skyBlue",
                        {
                           "opacity-0": notification.viewed,
                        }
                     )}
                  />

                  <div className="space-y-2">
                     <p className="text-sm font-medium">{notification.title}</p>
                     <p className="text-sm text-muted-foreground">
                        {notification.description}
                     </p>
                     <p className="text-sm text-muted-foreground">
                        {/* Format date i.e --- " 10 mins ago " */}
                        {moment(notification.date).fromNow()}
                     </p>
                  </div>

                  <Button
                     size="icon"
                     variant="ghost"
                     className="h-6 w-6 rounded-full border-none"
                     onClick={() => deleteNotification(notification._id)}
                  >
                     <CgClose size={15} />
                  </Button>
               </InView>
            );
         })}
      </div>
   );
};

export default NotificationItems;
