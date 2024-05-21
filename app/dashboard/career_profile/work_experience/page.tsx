"use client";

import { cn } from "@/lib/utils";
import { CareerProfileLayouts } from "@/components/career_profile/career-profile-layout";
import { Button } from "@/components/ui/button";
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";

import { useRouter } from "next/navigation";
import "react-phone-input-2/lib/style.css";
import { routeConstants } from "@/constants/route-const";
import { careerConstants } from "@/constants/career-const";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";

import WorkExperienceCard from "@/components/career_profile/preview/work_experience/work-experience-card";
import { EditWorkExperience } from "@/components/career_profile/preview/work_experience/edit-work-experience";
import { useIsLoading } from "@/hooks/shared/useIsLoading";

const Experiences = () => {
   const router = useRouter();
   const { isOpen, handleOpenChange } = useIsLoading();
   const { profile } = routeConstants.authRoute.nestedRoute;
   const {
      workExperience: { experienceDemoData },
   } = careerConstants;

   return (
      <CareerProfileLayouts pageTitle="Work Experience">
         <Card className="shadow-sm">
            <CardHeader>
               <CardTitle>Work Experience</CardTitle>
               <CardDescription>
                  Add your Work Experience. Such as an internship, part-time
                  work or long term specialised experience.
               </CardDescription>
            </CardHeader>

            <CardContent>
               {experienceDemoData.length > 0 ? (
                  experienceDemoData.map((data, index) => (
                     <WorkExperienceCard
                        key={index}
                        experience={data} // pass the data to the WorkExperienceCard
                     />
                  ))
               ) : (
                  <h1 className="font-semibold">No Experience</h1>
               )}
            </CardContent>

            <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
               {/* NOTE: The edit experience is wrapped in dialog content */}
               <EditWorkExperience />

               <CardFooter className="justify-end gap-4">
                  <Button
                     variant="destructive"
                     type="button"
                     onClick={() => router.push(profile)}
                  >
                     Back
                  </Button>

                  <AlertDialogTrigger asChild>
                     <Button>Add</Button>
                  </AlertDialogTrigger>
               </CardFooter>
            </AlertDialog>
         </Card>
      </CareerProfileLayouts>
   );
};

export default Experiences;
