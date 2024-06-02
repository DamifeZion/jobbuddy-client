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
import { careerConstants } from "@/constants/career-const";

const PersonalInformation = () => {
   const { profilePersonalInfo } = routeConstants.authRoute.nestedRoute;

   const personalInformationDemoData =
      careerConstants.personalInformationDemoData;

   const {
      fullname: initialFullname,
      email: initialEmail,
      phone: initialPhone,
      location: initialLocation,
      linkedIn: initialLinkedIn,
      website: initialWebsite,
      professionalTitle: initialProfessionalTitle,
   } = personalInformationDemoData || {}; // Provide an empty object as a fallback

   return (
      <Card>
         <CardHeader>
            <CardTitle className="text-lg">Personal Information</CardTitle>
            <CardDescription>
               This section includes your contact details. It’s essential for
               potential employers to know how to reach you.
            </CardDescription>
         </CardHeader>

         {Object.keys(personalInformationDemoData).length > 0 && (
            <CardContent></CardContent>
         )}

         <CardFooter>
            <Button>
               <Link href={profilePersonalInfo}>Update</Link>
            </Button>
         </CardFooter>
      </Card>
   );
};

export default PersonalInformation;
