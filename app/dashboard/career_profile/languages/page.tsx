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

const Language = () => {
   const { profileLanguage } = routeConstants.authRoute.nestedRoute;

   return (
      <Card>
         <CardHeader>
            <CardTitle className="text-lg">Languages</CardTitle>
            <CardDescription>
               This section shows the languages you speak. This can be important
               for roles that require communication in specific languages.
            </CardDescription>
         </CardHeader>

         <CardContent>
            The languages you speak will be listed here. Be sure to include any
            that are relevant to the job you’re applying for.
         </CardContent>

         <CardFooter>
            <Button>
               <Link href={profileLanguage}>Update</Link>
            </Button>
         </CardFooter>
      </Card>
   );
};

export default Language;
