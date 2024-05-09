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

const PersonalInformation = () => {
   const { profilePersonalInfo } = routeConstants.authRoute.nestedRoute;

   return (
      <Card>
         <CardHeader>
            <CardTitle className="text-lg">Personal Information</CardTitle>
            <CardDescription>
               This section includes your contact details. It’s essential for
               potential employers to know how to reach you.
            </CardDescription>
         </CardHeader>

         <CardContent>
            Your contact details will be displayed here. Make sure to provide
            accurate information.
         </CardContent>

         <CardFooter>
            <Button>
               <Link href={profilePersonalInfo}>Update</Link>
            </Button>
         </CardFooter>
      </Card>
   );
};

export default PersonalInformation;
