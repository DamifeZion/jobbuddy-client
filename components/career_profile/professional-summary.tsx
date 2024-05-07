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

const ProfessionalSummary = () => {
   const { profileProfessionalSummary } = routeConstants.authRoute.nestedRoute;

   return (
      <Card>
         <CardHeader>
            <CardTitle className="text-lg">Professional Summary</CardTitle>
            <CardDescription>
               This section provides a snapshot of your career achievements,
               skills, and professional background. It’s important because it
               gives potential employers a quick overview of your
               qualifications.
            </CardDescription>
         </CardHeader>

         <CardContent>
            Your professional summary will appear here. It should highlight your
            career achievements, skills, and professional background.
         </CardContent>

         <CardFooter>
            <Button>
               <Link href={profileProfessionalSummary}>Update</Link>
            </Button>
         </CardFooter>
      </Card>
   );
};

export default ProfessionalSummary;
