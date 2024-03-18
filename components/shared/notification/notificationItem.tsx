import { NotificationSliceProp } from "@/types";
import { InView } from "react-intersection-observer";
import { markAsRead, countUnreadMessages } from "@/util/shared/notification-util";
import moment from "moment";
import { CgClose } from "react-icons/cg";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const NotificationItems = ({ notifications }: NotificationSliceProp) => {
   const unreadMessagesCount = countUnreadMessages(notifications);

   return (
      <div>
         {notifications.map((notification, index) => {
            return (
               <InView
                  as="div"
                  key={notification._id}
                  triggerOnce
                  onChange={(inView) =>
                     markAsRead(notification.viewed, () => {
                        // Run the update query or function here
                        console.log(`Set notification to viewed in notificationContent.`);
                     })
                  }
                  className={cn(
                     "py-4 grid grid-cols-[25px_1fr_25px] items-start border-b border-border first:pt-0 last:pb-0 last:border-none",
                     {
                        "grid-cols-[1fr]": !unreadMessagesCount,
                     }
                  )}
               >
                  <span
                     className={cn("flex h-2 w-2 translate-y-1 rounded-full bg-sky-500", {
                        "opacity-0": notification.viewed,
                     })}
                  />
                  <div className="space-y-2">
                     <p className="text-sm font-medium leading-none">{notification.title}</p>
                     <p className="text-sm text-muted-foreground">{notification.description}</p>
                     <p className="text-sm text-muted-foreground">
                        {/* Format date i.e --- " 10 mins ago " */}
                        {moment(notification.date).fromNow()}
                     </p>
                  </div>
                  <Button
                     size="icon"
                     variant="ghost"
                     className="h-6 w-6 rounded-full border-none"
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