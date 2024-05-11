import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { routeConstants } from "@/constants/route-const";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { careerConstants } from "@/constants/career-const";

const Award = () => {
   const { profileAward } = routeConstants.authRoute.nestedRoute;
   const { careerRoutes } = careerConstants;
   //NOTE: We want to get only the awards object from the careerRoute array, to dynamically render badge. The route is the best because it is unique and constant in all files, comes from the route constants.
   const awardArray = careerRoutes.filter(
      (career) => career.href === profileAward
   );
   const award = awardArray[0];

   return (
      <Card>
         <CardHeader>
            <CardTitle className="flex items-center gap-4 text-lg">
               Awards and Honour
               {!award.required && <Badge variant="secondary">Optional</Badge>}
            </CardTitle>
            <CardDescription>
               This section highlights any recognition you’ve received. It’s
               important because it shows your dedication and achievements
            </CardDescription>
         </CardHeader>

         <CardContent>
            Any awards or honours you’ve received will be displayed here. These
            can highlight your dedication and achievements.
         </CardContent>

         <CardFooter>
            <Button>
               <Link href={profileAward}>Update</Link>
            </Button>
         </CardFooter>
      </Card>
   );
};

export default Award;
