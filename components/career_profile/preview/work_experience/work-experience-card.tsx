import BulletPoint from "@/components/shared/bullet-point/bullet-point";
import { careerConstants } from "@/constants/career-const";

// NOTE: This component, you will design just one reusable work experience card. That shows all the details on the users experiences.
const WorkExperienceCard = () => {
   const { experienceDemoData } = careerConstants.workExperience;
   const workData = experienceDemoData[0];

   return (
      <div key={workData.companyName}>
         <h1 className="text-lg font-semibold">{workData.jobTitle}</h1>

         <h3 className="inline-flex gap-1.5 text-sm 400:text-md">
            <span>{workData.companyName}</span>
            <BulletPoint>{workData.workType}</BulletPoint>
         </h3>

         <p className="text-sm text-muted-foreground 400:text-md">
            {workData.startDate} -{" "}
            <span className="inline-flex gap-1.5">
               {workData.currentJob ? "Present" : workData.endDate}{" "}
               <BulletPoint bulletPointClassName="bg-muted-foreground">
                  7 mos
               </BulletPoint>
            </span>
         </p>

         <p className="inline-flex gap-1.5 text-sm text-muted-foreground 400:text-md">
            {workData.city}, {workData.state}, {workData.country}
            <BulletPoint bulletPointClassName="bg-muted-foreground">
               {workData.workType}
            </BulletPoint>
         </p>
      </div>
   );
};

export default WorkExperienceCard;
