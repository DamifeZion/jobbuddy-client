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

const Skill = () => {
   const { profileSkill } = routeConstants.authRoute.nestedRoute;

   return (
      <Card>
         <CardHeader>
            <CardTitle className="text-lg">Skills</CardTitle>
            <CardDescription>
               This section showcases your abilities relevant to the job. It’s
               vital because it shows what you can bring to the role.
            </CardDescription>
         </CardHeader>

         <CardContent>
            Your skills will be listed here. Be sure to include those that are
            relevant to the job you’re applying for.
         </CardContent>

         <CardFooter>
            <Button>
               <Link href={profileSkill}>Update</Link>
            </Button>
         </CardFooter>
      </Card>
   );
};

export default Skill;
