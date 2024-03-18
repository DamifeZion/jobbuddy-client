import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MdDiversity2 } from "react-icons/md";

const LoadingNotification = () => {
   const notifications = [0, 1, 2, 4];

   return (
      <div className="grid gap-4 p-0">
         {notifications.map((notification, index) => (
            <div
               key={index}
               className="py-0 grid grid-cols-1 items-start first:pt-0 last:pb-0"
            >
               <div className="space-y-2">
                  <Skeleton className="w-full h-4" />
                  <Skeleton className="w-4/12 h-3" />
                  <Skeleton className="text-sm text-muted-foreground" />
               </div>
            </div>
         ))}
      </div>
   );
};

export default LoadingNotification;
