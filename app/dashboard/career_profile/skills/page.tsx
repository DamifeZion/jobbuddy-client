"use client";

import { useRouter } from "next/navigation";
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
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { careerConstants } from "@/constants/career-const";
import { routeConstants } from "@/constants/route-const";
import { useIsLoading } from "@/hooks/shared/useIsLoading";
import { SkillForm } from "@/components/career_profile/preview/skills/skill-form";
import { SkillsCard } from "@/components/career_profile/preview/skills/skills-card";

const Skills = () => {
   const router = useRouter();
   const { isOpen, handleOpenChange, closeModal } = useIsLoading();
   const { profile } = routeConstants.authRoute.nestedRoute;
   const {
      skills: { skillsDemoData },
   } = careerConstants;

   return (
      <CareerProfileLayouts pageTitle="Skills">
         <Card className="shadow-sm">
            <CardHeader>
               <CardTitle>Skills</CardTitle>
               <CardDescription>
                  Add your Work Experience. Such as an internship, part-time
                  work or long term specialised experience.
               </CardDescription>
            </CardHeader>

            {skillsDemoData && (
               <CardContent>
                  <SkillsCard skills={skillsDemoData} />
               </CardContent>
            )}

            <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
               {/* NOTE: The edit experience is wrapped in dialog content. This is actually to add work experience */}
               <SkillForm closeModal={closeModal} />

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

export default Skills;
