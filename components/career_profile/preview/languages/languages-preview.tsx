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

const Language = () => {
   const { profileLanguage } = routeConstants.authRoute.nestedRoute;
   const {
      languages: { languageDemoData },
   } = careerConstants;
   const languagesArray = languageDemoData.split(",");

   return (
      <Card>
         <CardHeader>
            <CardTitle className="text-lg">Languages</CardTitle>
            <CardDescription>
               This section shows the languages you speak. This can be important
               for roles that require communication in specific languages.
            </CardDescription>
         </CardHeader>

         {languagesArray.length && (
            <CardContent className="flex flex-wrap gap-y-4 gap-x-2">
               {languagesArray.map((lang, index) => (
                  <Badge key={index} variant="secondary">
                     {lang}
                  </Badge>
               ))}
            </CardContent>
         )}

         <CardFooter>
            <Button>
               <Link href={profileLanguage}>Update</Link>
            </Button>
         </CardFooter>
      </Card>
   );
};

export default Language;
