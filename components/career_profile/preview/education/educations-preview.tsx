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
import moment from "moment";
import { Separator } from "@/components/ui/separator";

const Education = () => {
   const { profileEducation } = routeConstants.authRoute.nestedRoute;
   const {
      education: { educationDemoData },
   } = careerConstants;

   const renderEducation = () => {
      return educationDemoData.map((education, index) => {
         const startMoment = moment(education.startDate);
         const endMoment = moment(education.endDate);

         const startDate = startMoment.format("MMMM YYYY");
         const endDate = endMoment.format("MMMM YYYY");
         // Calculate the duration in months

         return (
            <div key={index}>
               {index !== 0 && <Separator className="my-6" />}

               <h1>{education.school}</h1>

               <p className="text-sm text-muted-foreground 400:text-md">
                  {education.degree}, {education.fieldOfStudy}
               </p>

               <p className="text-sm text-muted-foreground 400:text-md">
                  {startDate} - {endDate}
               </p>
            </div>
         );
      });
   };

   return (
      <Card>
         <CardHeader>
            <CardTitle className="text-lg">Education</CardTitle>
            <CardDescription>
               This section lists your academic qualifications. It&apos;s important
               because it shows your theoretical knowledge and learning
               capabilities
            </CardDescription>
         </CardHeader>

         <CardContent>
            {educationDemoData.length > 0 && renderEducation() }
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
