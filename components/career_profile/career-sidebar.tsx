"use client";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { StoreRootState } from "@/services/redux-provider/store";
import { useSelector } from "react-redux";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { careerConstants } from "@/constants/career-const";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { navbarConstants } from "@/constants/navbar-const";

const CareerSidebar = () => {
   const { retractSidebar } = useSelector(
      (state: StoreRootState) => state.navbarSlice
   );
   const router = useRouter();
   const { careerRoutes } = careerConstants;
   const percentage = 10; // replace this with your dynamic value
   const { Mobile_Navbar_Height } = navbarConstants;

   const handleRouteClick = (href: string) => {
      router.push(href);
   };

   return (
      <div
         style={{ top: `calc(${Mobile_Navbar_Height} + 10px)` }}
         className={cn(
            "flex-grow transition-w ease-linear duration-150 rounded-xl overflow-hidden shadow-sm lg:w-[350px] lg:sticky",
            {
               "lg:w-[400px]": retractSidebar,
            }
         )}
      >
         <Card className="shadow-none">
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
                     <div className="flex items-center">
                        <div
                           className="flex items-center [&_span]:cursor-pointer"
                           onClick={() => handleRouteClick(data.href)}
                        >
                           <Checkbox checked={data.filled} className="size-6" />
                           <span className="ml-4">{data.title}</span>
                        </div>

                        {!data.required && (
                           <Badge variant="secondary" className="ml-1">
                              Optional
                           </Badge>
                        )}
                     </div>

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
