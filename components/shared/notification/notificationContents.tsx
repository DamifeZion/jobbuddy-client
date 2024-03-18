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
import { countUnreadMessages } from "@/util/shared/notification-util";
import NotificationItem from "./notificationItem";

const NotificationContents = ({
   isLoading,
   notifications,
}: NotificationSliceProp) => {
   // Function to count unread messages
   let unreadMessagesCount;
   if (!isLoading) {
      unreadMessagesCount = countUnreadMessages(notifications);
   }

   const markAllAsRead = () => {
      const notificationsToMarkRead = [
         ...notifications.map((notification) => notification._id),
      ];

      console.log(
         "mark all notification as read with the ids: ",
         notificationsToMarkRead
      );
   };

   return (
      <Card className="w-full border-none">
         <CardHeader>
            <CardTitle>Notifications</CardTitle>

            {!isLoading && (
               <CardDescription>
                  {unreadMessagesCount
                     ? `You have ${unreadMessagesCount} unread messages.`
                     : `No new messages. You’re all caught up!`}
               </CardDescription>
            )}
         </CardHeader>

         <CardContent className="grid gap-4">
            <div>
               <NotificationItem
                  isLoading={isLoading}
                  notifications={notifications}
               />
            </div>
         </CardContent>

         {unreadMessagesCount ? (
            <CardFooter className="w-full sticky bottom-0 left-0 bg-background pt-1">
               <Button className="w-full" onClick={markAllAsRead}>
                  <CheckIcon className="mr-2 h-4 w-4" /> Mark all as read
               </Button>
            </CardFooter>
         ) : (
            ""
         )}
      </Card>
   );
};

export default NotificationContents;
