import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { routeConstants } from "@/constants/route-const";
import Link from "next/link";
import { careerConstants } from "@/constants/career-const";
import { Badge } from "@/components/ui/badge";

const Skill = () => {
   const { profileSkill } = routeConstants.authRoute.nestedRoute;
   const { skillsDemoData } = careerConstants.skills;
   const skillsArray = skillsDemoData.split(",");

   return (
      <Card>
         <CardHeader>
            <CardTitle className="text-lg">Skills</CardTitle>
            <CardDescription>
               This section showcases your abilities relevant to the job. It’s
               vital because it shows what you can bring to the role.
            </CardDescription>
         </CardHeader>

         {skillsDemoData && (
            <CardContent className="flex flex-wrap gap-y-4 gap-x-2">
               {skillsArray.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                     {skill}
                  </Badge>
               ))}
            </CardContent>
         )}

         <CardFooter>
            <Button>
               <Link href={profileSkill}>Update</Link>
            </Button>
         </CardFooter>
      </Card>
   );
};

export default Skill;
