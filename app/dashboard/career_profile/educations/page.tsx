"use client";

import { CareerProfileLayouts } from "@/components/career_profile/career-profile-layout";
import EducationCard from "@/components/career_profile/preview/education/education-card";
import EducationForm from "@/components/career_profile/preview/education/education-form";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
   Card,
   CardDescription,
   CardHeader,
   CardTitle,
   CardContent,
   CardFooter,
} from "@/components/ui/card";
import { careerConstants } from "@/constants/career-const";
import { routeConstants } from "@/constants/route-const";
import { useIsLoading } from "@/hooks/shared/useIsLoading";
import { useRouter } from "next/navigation";

const Educations = () => {
   const router = useRouter();
   const { isOpen, handleOpenChange, closeModal } = useIsLoading();
   const { profile } = routeConstants.authRoute.nestedRoute;
   const {
      education: { educationDemoData },
   } = careerConstants;

   return (
      <CareerProfileLayouts pageTitle="Educations">
         <Card className="shadow-sm">
            <CardHeader>
               <CardTitle>Education</CardTitle>

               <CardDescription>
                  Add your Work Experience. Such as an internship, part-time
                  work or long term specialised experience.
               </CardDescription>
            </CardHeader>

            <CardContent>
               {educationDemoData.length > 0 ? (
                  educationDemoData.map((data, index) => (
                     <EducationCard
                        key={index}
                        index={index}
                        education={data} // pass the data to the WorkExperienceCard
                     />
                  ))
               ) : (
                  <h1 className="font-semibold">No Education</h1>
               )}
            </CardContent>

            <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
               {/* NOTE: The EducationForm is wrapped in dialog content. This is actually to add Education */}
               <EducationForm closeModal={closeModal} />

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

export default Educations;
