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
import { Badge } from "@/components/ui/badge";

const Certifications = () => {
   const { careerRoutes } = careerConstants;
   const { profileCertifications } = routeConstants.authRoute.nestedRoute;
   const certificationArray = careerRoutes.filter(
      (career) => career.href === profileCertifications
   );
   const certification = certificationArray[0];

   return (
      <Card>
         <CardHeader>
            <CardTitle className="flex items-center gap-4 text-lg">
               Certifications
               {!certification.required && (
                  <Badge variant="secondary">Optional</Badge>
               )}
            </CardTitle>
            <CardDescription>
               This section lists any certifications you’ve earned. These can
               help set you apart from other candidates.
            </CardDescription>
         </CardHeader>

         <CardContent>
            Any certifications you’ve earned will be displayed here.
            Certifications can help you stand out among other candidates.
         </CardContent>

         <CardFooter>
            <Button>
               <Link href={profileCertifications}>Update</Link>
            </Button>
         </CardFooter>
      </Card>
   );
};

export default Certifications;
