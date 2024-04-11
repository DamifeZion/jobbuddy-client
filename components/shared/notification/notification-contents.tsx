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
import NotificationItem from "./notification-item";
import { visibleViewportHeight } from "@/constants/screen-const";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

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
      <Card className="w-full min-w-[300px] rounded-[inherit] border-y-transparent [641px]:border-y-border">
         <CardHeader className="py-4">
            <CardTitle className="text-xl" >Notifications</CardTitle>
         </CardHeader>

         <Separator />

         <ScrollArea
            style={{ height: `calc(${visibleViewportHeight} - 80px)` }}
         >
            {!isLoading && (
               <CardDescription className="px-6 pt-3 pb-4">
                  {unreadMessagesCount
                     ? `You have ${unreadMessagesCount} unread messages.`
                     : `No new messages. You’re all caught up!`}
               </CardDescription>
            )}

            <CardContent className="grid gap-4">
               <NotificationItem
                  isLoading={isLoading}
                  notifications={notifications}
               />
            </CardContent>
         </ScrollArea>

         {unreadMessagesCount ? (
            <CardFooter className="w-full bg-background pt-1.5 shadow-[0px_0px_10px_rgba(0,0,0/10)]">
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
