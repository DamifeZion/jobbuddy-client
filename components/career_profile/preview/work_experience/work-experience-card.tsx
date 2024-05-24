import BulletPoint from "@/components/shared/bullet-point/bullet-point";
import {
   AlertDialogCancel,
   AlertDialog,
   AlertDialogAction,
   AlertDialogContent,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTrigger,
   AlertDialogTitle,
   AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Edit3, Trash2 } from "lucide-react";
import moment from "moment"; // Import moment
import { EditWorkExperience } from "./edit-work-experience";
import { WorkExperienceCardProps } from "@/types";
import { useIsLoading } from "@/hooks/shared/useIsLoading";
import { Separator } from "@/components/ui/separator";

const WorkExperienceCard = ({ index, experience }: WorkExperienceCardProps) => {
   const { isOpen, handleOpenChange, closeModal } = useIsLoading();

   const startMoment = moment(experience.startDate);
   const endMoment = experience.currentJob
      ? moment()
      : moment(experience.endDate);

   const startDate = startMoment.format("MMMM YYYY");
   const endDate = endMoment.format("MMMMM YYYY");
   // Calculate the duration in months
   const durationInMonths = endMoment.diff(startMoment, "months");

   const initialStartDate = experience.startDate
      ? new Date(experience.startDate)
      : undefined;
   const initialEndDate = experience.endDate
      ? new Date(experience.endDate)
      : undefined;

   const handleDeleteExperience = () => {
      // NOTE: Make a query to delete the experience with the ID of id. Dont forget to set global loading to disable the alert and also disable button until success then close modal.
      alert(
         `Make a query to DB to delete the experience with the ID of ${experience.id}`
      );
   };

   return (
      <div key={experience.companyName}>
         {index !== 0 && <Separator className="my-8" />}

         <div className="flex gap-2 font-semibold">
            <span className="flex-grow">
               {experience.jobTitle} at <span>{experience.companyName}</span>
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
                  <EditWorkExperience
                     title="Edit Work Experience"
                     initialCompanyName={experience.companyName}
                     initialJobTitle={experience.jobTitle}
                     initialJobLevel={experience.jobLevel}
                     initialWorkType={experience.workType}
                     initialWorkMode={experience.workMode}
                     initialCountry={experience.country}
                     initialState={experience.state}
                     initialCity={experience.city}
                     initialStartDate={initialStartDate}
                     initialEndDate={initialEndDate}
                     initialCurrentJob={experience.currentJob}
                     initialJobResponsibilities={experience.jobResponsibilities}
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
                        <AlertDialogTitle>Delete experience</AlertDialogTitle>

                        <AlertDialogDescription>
                           Are you sure you want to delete your{" "}
                           {experience.jobTitle} at {experience.companyName}?
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

         <div className="flex items-center flex-wrap gap-1.5 text-sm text-muted-foreground 400:text-md">
            <span>
               {experience.city}, {experience.state}, {experience.country}
            </span>
            <BulletPoint bulletPointClassName="bg-muted-foreground">
               {experience.workMode}
            </BulletPoint>
            <BulletPoint bulletPointClassName="bg-muted-foreground">
               {experience.workType}
            </BulletPoint>
         </div>

         <div className="flex items-center gap-1.5 flex-wrap text-sm text-muted-foreground 400:text-md">
            {startDate} - {experience.currentJob ? "Present" : endDate}{" "}
            <BulletPoint bulletPointClassName="bg-muted-foreground">
               {durationInMonths} mos
            </BulletPoint>
         </div>

         {/* NOTE: THis has to be a div, because i will be showing a WYSIWAG editor output here */}
         <div
            className="tiptap-wysiwag-editor  mt-4"
            dangerouslySetInnerHTML={{
               __html: experience.jobResponsibilities || "",
            }}
         />
      </div>
   );
};

export default WorkExperienceCard;
