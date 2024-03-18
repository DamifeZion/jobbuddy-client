import { CgClose } from "react-icons/cg";
import { CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { NotificationSliceProp } from "@/types";
import LoadingNotification from "./loading-notification";
import moment from "moment";
import {
   countUnreadMessages,
   markAsRead,
} from "@/util/shared/notification-util";
import { InView } from "react-intersection-observer";

const NotificationContent = ({
   isLoading,
   notifications,
}: NotificationSliceProp) => {
   if (isLoading) {
      return <LoadingNotification />;
   }

   // Function to count unread messages
   const unreadMessagesCount = countUnreadMessages(notifications);

   // Now when a user scrolls into view any of this item, then you want to mark it as checked

   return (
      <Card className="w-full border-none">
         <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
               {unreadMessagesCount
                  ? `You have ${unreadMessagesCount} unread messages.`
                  : `No new messages. You’re all caught up!`}
            </CardDescription>
         </CardHeader>

         <CardContent className="grid gap-4">
            <div>
               {notifications.map((notification, index) => {
                  return (
                     <InView
                        as="div"
                        key={index}
                        triggerOnce
                        onChange={(inView) =>
                           markAsRead(notification.viewed, () => {
                              // Run the update query or function here
                              console.log(
                                 `Notification In View ${notification._id}: true `
                              );
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
                           className={cn(
                              "flex h-2 w-2 translate-y-1 rounded-full bg-sky-500",
                              {
                                 "opacity-0": notification.viewed,
                              }
                           )}
                        />

                        <div className="space-y-2">
                           <p className="text-sm font-medium leading-none">
                              {notification.title}
                           </p>

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
                        >
                           <CgClose size={15} />
                        </Button>
                     </InView>
                  );
               })}
            </div>
         </CardContent>

         {unreadMessagesCount ? (
            <CardFooter className="w-full sticky bottom-0 left-0 bg-background pt-1">
               <Button className="w-full">
                  <CheckIcon className="mr-2 h-4 w-4" /> Mark all as read
               </Button>
            </CardFooter>
         ) : (
            ""
         )}
      </Card>
   );
};

export default NotificationContent;
