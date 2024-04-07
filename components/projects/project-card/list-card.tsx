import {
   Card,
   CardHeader,
   CardTitle,
   CardContent,
   CardDescription,
   CardFooter,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ProjectCardLayoutProps } from "@/types";


const ListCard = ({project, totalProjectCount}: ProjectCardLayoutProps) => {
   return (
      <Card className="grid grid-cols-1">
         List Card
      </Card>
   );
};

export default ListCard;
