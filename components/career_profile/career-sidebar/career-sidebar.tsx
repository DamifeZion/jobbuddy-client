"use client";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { StoreRootState } from "@/services/store";
import { useSelector } from "react-redux";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { careerConstants } from "@/constants/career-const";

const CareerSidebar = () => {
   const { retractSidebar } = useSelector(
      (state: StoreRootState) => state.navbarSlice
   );
   const { careerRoutes } = careerConstants;
   const percentage = 10; // replace this with your dynamic value

   return (
      <div
         className={cn(
            "flex-grow transition-w ease-linear duration-150 lg:w-[350px] rounded-xl overflow-hidden",
            {
               "lg:w-[400px]": retractSidebar,
            }
         )}
      >
         <Card>
            <CardHeader className="min-h-[140px] flex-grow flex-col items-center gap-6 rounded-none text-foreground">
               <div className="w-full flex flex-col gap-4">
                  <h3 className="text-3xl">{percentage}%</h3>

                  <Progress
                     unselectable="on"
                     value={percentage}
                     className="w-full h-8"
                  />
               </div>

               <p className="w-full text-balance">
                  Maximize AI accuracy and optimize your resume by completing
                  your profile.
               </p>
            </CardHeader>

            <Separator />

            <div id="lists" className="p-6 space-y-5">
               {careerRoutes.map((data, index) => (
                  <div
                     key={index}
                     className="flex items-center gap-4 justify-between"
                  >
                     <Link href={data.href}>
                        <div className="flex items-center gap-4">
                           <Checkbox checked={data.filled} className="size-6" />{" "}
                           {data.title}
                        </div>
                     </Link>

                     <span className="text-accent-foreground">
                        {data.percentage}
                     </span>
                  </div>
               ))}
            </div>
         </Card>
      </div>
   );
};

export default CareerSidebar;
