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
import BulletPoint from "@/components/shared/bullet-point/bullet-point";
import { Separator } from "@/components/ui/separator";

const Experience = () => {
   const { profileExperience } = routeConstants.authRoute.nestedRoute;

   // NOTE: Query DB to get the work experiences.
   const {
      workExperience: { experienceDemoData },
   } = careerConstants;

   const renderExperience = () => {
      return experienceDemoData.map((experience, index) => {
         const startMoment = moment(experience.startDate);
         const endMoment = experience.currentJob
            ? moment()
            : moment(experience.endDate);

         const startDate = startMoment.format("MMMM YYYY");
         const endDate = endMoment.format("MMMMM YYYY");
         // Calculate the duration in months
         const durationInMonths = endMoment.diff(startMoment, "months");

         return (
            <div key={index}>
               {index !== 0 && <Separator className="my-6" />}

               <h1 className="flex items-center text-lg font-semibold">
                  <span className="flex-grow">
                     {experience.jobTitle} at{" "}
                     <span>{experience.companyName}</span>
                  </span>
               </h1>

               <p className="inline-flex gap-1.5 text-sm text-muted-foreground 400:text-md">
                  {experience.city}, {experience.state}, {experience.country}
                  <BulletPoint bulletPointClassName="bg-muted-foreground">
                     {experience.workMode}
                  </BulletPoint>
                  <BulletPoint bulletPointClassName="bg-muted-foreground">
                     {experience.workType}
                  </BulletPoint>
               </p>

               <p className="text-sm text-muted-foreground 400:text-md">
                  {startDate} -{" "}
                  <span className="inline-flex gap-1.5">
                     {experience.currentJob ? "Present" : endDate}{" "}
                     <BulletPoint bulletPointClassName="bg-muted-foreground">
                        {durationInMonths} mos
                     </BulletPoint>
                  </span>
               </p>
            </div>
         );
      });
   };

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
            {!experienceDemoData.length ? (
               <p>
                  Your work history will be listed here. Include your roles,
                  responsibilities, and accomplishments.
               </p>
            ) : (
               renderExperience()
            )}
         </CardContent>

         <CardFooter>
            <Button>
               <Link href={profileExperience}>Update</Link>
            </Button>
         </CardFooter>
      </Card>
   );
};

export default Experience;
