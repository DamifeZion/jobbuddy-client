import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingNotification = () => {
   const notifications = [0, 1, 2];

   return (
      <div className="grid gap-4 p-0">
         {notifications.map((notification, index) => (
            <div
               key={index}
               className="grid grid-cols-1 items-start first:pt-0 last:pb-0"
            >
               <div className="mt-3 space-y-2">
                  <Skeleton className="w-full h-5 rounded-sm" />
                  <Skeleton className="w-4/12 h-4 rounded-sm" />
                  <Skeleton className="w-2/12 h-3 rounded-sm" />
               </div>
            </div>
         ))}
      </div>
   );
};

export default LoadingNotification;
