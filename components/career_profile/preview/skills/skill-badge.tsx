"use client";

import { Badge } from "@/components/ui/badge";
import { SkillBadgeProps } from "@/types";
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
import { Edit3, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsLoading } from "@/hooks/shared/useIsLoading";
import { SkillForm } from "@/components/career_profile/preview/skills/skill-form";

export const SkillBadges = ({ skills }: SkillBadgeProps) => {
   // Split the skills string into an array by either comma or space
   const skillsArray = skills.split(",");
   const { closeModal, handleOpenChange, isOpen } = useIsLoading();


   const handleDeleteExperience = () => {
      // NOTE: Make a query to delete the experience with the ID of id. Dont forget to set global loading to disable the alert and also disable button until success then close modal.
      alert(
         `Make a query to DB to delete the education with the ID of`
      );
   };

   return (
      <div className="group/header flex justify-between">
         <div className="flex-1 flex flex-wrap gap-y-4 gap-x-2">
            {skillsArray.map((skill, index) => (
               <Badge key={index} variant="secondary">{skill}</Badge>
            ))}
         </div>

         <div
            id="action-buttons"
            className="flex gap-2.5 transition-opacity ease-in-out duration-150 lg:invisible lg:opacity-0 lg:group-hover/header:visible lg:group-hover/header:opacity-100"
         >
            {/*=== EDIT ===*/}
            <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
               <AlertDialogTrigger asChild>
                  <Button size="icon" variant="ghost" className="size-8">
                     <Edit3 className="size-6" />
                  </Button>
               </AlertDialogTrigger>

               {/* NOTE: Since the props the below expects is the exact same as the workExperience, then we simply save stress and spread */}
               <SkillForm
                  title="Edit Skills"
                  initialSkills={skills}
                  closeModal={closeModal}
               />
            </AlertDialog>

            {/*=== DELETE ===*/}
            <AlertDialog>
               <AlertDialogTrigger asChild>
                  <Button size="icon" variant="destructive" className="size-8">
                     <Trash2 className="size-6" />
                  </Button>
               </AlertDialogTrigger>

               <AlertDialogContent>
                  <AlertDialogHeader>
                     <AlertDialogTitle>Delete Skills</AlertDialogTitle>

                     <AlertDialogDescription>
                        Are you sure you want to delete your skills?
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
   );
};
