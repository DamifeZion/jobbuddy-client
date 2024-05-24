"use client";

import { Separator } from "@/components/ui/separator";
import moment from "moment";
import { EducationCardProps } from "@/types";
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Edit3, Trash2 } from "lucide-react";
import EducationForm from "./education-form";
import { useIsLoading } from "@/hooks/shared/useIsLoading";

const EducationCard = ({ index, education }: EducationCardProps) => {
   const { isOpen, handleOpenChange, closeModal } = useIsLoading();

   const startMoment = moment(education.startDate);
   const endMoment = moment(education.endDate);

   const startDate = startMoment.format("MMMM YYYY");
   const endDate = endMoment.format("MMMMM YYYY");
   // Calculate the duration in months
   const durationInMonths = endMoment.diff(startMoment, "months");

   const initialStartDate = education.startDate
      ? new Date(education.startDate)
      : undefined;
   const initialEndDate = education.endDate
      ? new Date(education.endDate)
      : undefined;

   const handleDeleteExperience = () => {
      // NOTE: Make a query to delete the experience with the ID of id. Dont forget to set global loading to disable the alert and also disable button until success then close modal.
      alert(
         `Make a query to DB to delete the education with the ID of ${education.id}`
      );
   };

   return (
      <div>
         {index !== 0 && <Separator className="my-8" />}

         <div className="flex gap-2 font-semibold">
            <span className="flex-grow">
               {/* {experience.jobTitle} at <span>{}</span> */}
            </span>

            <div id="action-buttons" className="flex items-start gap-2.5">
               {/*=== EDIT ===*/}
               <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
                  <AlertDialogTrigger asChild>
                     <Button size="icon" variant="ghost" className="size-8">
                        <Edit3 className="size-6" />
                     </Button>
                  </AlertDialogTrigger>

                  {/* NOTE: Since the props the below expects is the exact same as the workExperience, then we simply save stress and spread */}
                  <EducationForm
                     title="Edit Education"
                     initialSchool={education.school}
                     initialDegree={education.degree}
                     initialFieldOfStudy={education.fieldOfStudy}
                     initialStartDate={initialStartDate}
                     initialEndDate={initialEndDate}
                     closeModal={closeModal}
                  />
               </AlertDialog>

               {/*=== DELETE ===*/}
               <AlertDialog>
                  <AlertDialogTrigger asChild>
                     <Button
                        size="icon"
                        variant="destructive"
                        className="size-8"
                     >
                        <Trash2 className="size-6" />
                     </Button>
                  </AlertDialogTrigger>

                  <AlertDialogContent>
                     <AlertDialogHeader>
                        <AlertDialogTitle>Delete education</AlertDialogTitle>

                        <AlertDialogDescription>
                           Are you sure you want to delete your{" "}
                           {education.school}?
                        </AlertDialogDescription>
                     </AlertDialogHeader>

                     <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteExperience}>
                           Delete
                        </AlertDialogAction>
                     </AlertDialogFooter>
                  </AlertDialogContent>
               </AlertDialog>
            </div>
         </div>
      </div>
   );
};

export default EducationCard;
