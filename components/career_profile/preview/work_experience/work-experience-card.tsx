import BulletPoint from "@/components/shared/bullet-point/bullet-point";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Edit3 } from "lucide-react";
import moment from "moment"; // Import moment
import { EditWorkExperience } from "./edit-work-experience";
import { WorkExperienceCardProps } from "@/types";
import { useIsLoading } from "@/hooks/shared/useIsLoading";

const WorkExperienceCard = ({ experience }: WorkExperienceCardProps) => {
   const { isOpen, handleOpenChange } = useIsLoading();

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

   return (
      <div key={experience.companyName}>
         <h1 className="flex items-center text-lg font-semibold">
            <span className="flex-grow">{experience.jobTitle}</span>

            <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
               <AlertDialogTrigger asChild>
                  <Button size="icon" variant="ghost">
                     <Edit3 />
                  </Button>
               </AlertDialogTrigger>

               {/* NOTE: Since the props the below expects is the exact same as the workExperience, then we simply save stress and spread */}
               <EditWorkExperience
                  title="Edit Work Experience"
                  initialCompanyName={experience.companyName}
                  initialJobTitle={experience.jobTitle}
                  initialJobLevel={experience.jobLevel}
                  initialWorkType={experience.workType}
                  initialCountry={experience.country}
                  initialState={experience.state}
                  initialCity={experience.city}
                  initialStartDate={initialStartDate}
                  initialEndDate={initialEndDate}
                  initialCurrentJob={experience.currentJob}
                  initialJobResponsibilities={experience.jobResponsibilities}
               />
            </AlertDialog>
         </h1>

         <h3 className="inline-flex gap-1.5 text-sm 400:text-md">
            <span>{experience.companyName}</span>
            <BulletPoint>{experience.workType}</BulletPoint>
         </h3>

         <p className="text-sm text-muted-foreground 400:text-md">
            {startDate} -{" "}
            <span className="inline-flex gap-1.5">
               {experience.currentJob ? "Present" : endDate}{" "}
               <BulletPoint bulletPointClassName="bg-muted-foreground">
                  {durationInMonths} mos
               </BulletPoint>
            </span>
         </p>

         <p className="inline-flex gap-1.5 text-sm text-muted-foreground 400:text-md">
            {experience.city}, {experience.state}, {experience.country}
            <BulletPoint bulletPointClassName="bg-muted-foreground">
               {experience.workType}
            </BulletPoint>
         </p>

         {/* NOTE: THis has to be a div, because i will be showing a WYSIWAG editor output here */}
         <div className="mt-4">{experience.jobResponsibilities}</div>
      </div>
   );
};

export default WorkExperienceCard;
