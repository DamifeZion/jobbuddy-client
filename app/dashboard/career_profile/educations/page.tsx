import { CareerProfileLayouts } from "@/components/career_profile/career-profile-layout";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Educations = () => {
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
         </Card>
      </CareerProfileLayouts>
   );
};

export default Educations;
