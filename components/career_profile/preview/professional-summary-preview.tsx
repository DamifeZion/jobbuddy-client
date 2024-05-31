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

const ProfessionalSummary = () => {
   const { profileProfessionalSummary } = routeConstants.authRoute.nestedRoute;
   const { professionalSummaryDemoData } = careerConstants;

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

         {professionalSummaryDemoData && (
            <CardContent>
               <p className="line-clamp-3">{professionalSummaryDemoData}</p>
            </CardContent>
         )}


         <CardFooter>
            <Button>
               <Link href={profileProfessionalSummary}>Update</Link>
            </Button>
         </CardFooter>
      </Card>
   );
};

export default ProfessionalSummary;
