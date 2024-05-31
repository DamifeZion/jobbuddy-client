'use client';


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
import { useIsLoading } from "@/hooks/shared/useIsLoading";
import { useRouter } from "next/navigation";
import { routeConstants } from "@/constants/route-const";
import { LanguagesForm } from "@/components/career_profile/preview/languages/languages-form";
import { LanguagesCard } from "@/components/career_profile/preview/languages/languages-card";


const Languages = () => {
   const router = useRouter();
   const { isOpen, closeModal, handleOpenChange } = useIsLoading();
   const { profile } = routeConstants.authRoute.nestedRoute;
   const { languageDemoData } = careerConstants.languages;

   return (
      <CareerProfileLayouts pageTitle="Languages">
         <Card className="shadow-sm">
            <CardHeader>
               <CardTitle>Languages</CardTitle>
               <CardDescription>
                  Add your Work Experience. Such as an internship, part-time
                  work or long term specialised experience.
               </CardDescription>
            </CardHeader>

            {languageDemoData && (
               <CardContent>
                  <LanguagesCard languages={languageDemoData} />
               </CardContent>
            )}

            <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
               {/* NOTE: The edit experience is wrapped in dialog content. This is actually to add work experience */}
               <LanguagesForm closeModal={closeModal} />

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

export default Languages;
