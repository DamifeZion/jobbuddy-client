import BulletPoint from "@/components/shared/bullet-point/bullet-point";
import { careerConstants } from "@/constants/career-const";

// NOTE: This component, you will design just one reusable work experience card. That shows all the details on the users experiences.
const WorkExperienceCard = () => {
   const { experienceDemoData } = careerConstants.workExperience;
   const workData = experienceDemoData[0];

   return (
      <div key={workData.companyName}>
         <h1 className="text-lg font-semibold">{workData.jobTitle}</h1>
         
         <h3 className="inline-flex gap-1">
            {workData.companyName}
            <BulletPoint>{workData.workType}</BulletPoint>
         </h3>

         <p className="text-muted-foreground">
            {workData.startDate} -{" "}
            {workData.currentJob ? "Present" : workData.endDate}
         </p>
      </div>
   );
};

export default WorkExperienceCard;
