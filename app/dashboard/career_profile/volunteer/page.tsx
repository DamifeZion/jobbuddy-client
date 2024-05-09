import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { routeConstants } from "@/constants/route-const";
import Link from "next/link";
import { careerConstants } from "@/constants/career-const";
import { Badge } from "../../../../components/ui/badge";

const VolunteerExperience = () => {
   const { careerRoutes } = careerConstants;
   const { profileVolunteer } = routeConstants.authRoute.nestedRoute;
   const volunteerArray = careerRoutes.filter(
      (career) => career.href === profileVolunteer
   );
   const volunteer = volunteerArray[0];

   return (
      <Card>
         <CardHeader>
            <CardTitle className="flex items-center gap-4 text-lg">
               Volunteer Experience
               {!volunteer.required && (
                  <Badge variant="secondary">Optional</Badge>
               )}
            </CardTitle>
            <CardDescription>
               This section outlines any unpaid work you’ve done. It’s important
               because it shows your commitment to helping others and can
               provide additional experience.
            </CardDescription>
         </CardHeader>

         <CardContent>
            Your volunteer experience will be listed here. This can show your
            commitment to helping others and provide additional experience.
         </CardContent>

         <CardFooter>
            <Button>
               <Link href={profileVolunteer}>Update</Link>
            </Button>
         </CardFooter>
      </Card>
   );
};

export default VolunteerExperience;
