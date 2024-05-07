import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { routeConstants } from "@/constants/route-const";
import Link from "next/link";

const WorkExperience = () => {
   const { profileExperience } = routeConstants.authRoute.nestedRoute;

   return (
      <Card>
         <CardHeader>
            <CardTitle className="text-lg">Work Experience</CardTitle>
            <CardDescription>
               This section outlines your previous roles, responsibilities, and
               accomplishments. It’s crucial because it shows your practical
               experience and career progression.
            </CardDescription>
         </CardHeader>

         <CardContent>
            Your work history will be listed here. Include your roles,
            responsibilities, and accomplishments.
         </CardContent>

         <CardFooter>
            <Button>
               <Link href={profileExperience}>Update</Link>
            </Button>
         </CardFooter>
      </Card>
   );
};

export default WorkExperience;
