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

const Education = () => {
   const { profileEducation } = routeConstants.authRoute.nestedRoute;

   return (
      <Card>
         <CardHeader>
            <CardTitle className="text-lg">Education</CardTitle>
            <CardDescription>
               This section lists your academic qualifications. It’s important
               because it shows your theoretical knowledge and learning
               capabilities
            </CardDescription>
         </CardHeader>

         <CardContent>
            Your academic qualifications will be displayed here. Include all
            relevant education.
         </CardContent>

         <CardFooter>
            <Button>
               <Link href={profileEducation}>Update</Link>
            </Button>
         </CardFooter>
      </Card>
   );
};

export default Education;
