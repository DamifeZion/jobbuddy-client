import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dropzone } from "@/forms/dropzone/dropzone-form";

export const UpdateImage = () => {
   return (
      <Card className="max-h-[inherit] grid rounded-none shadow-none">
         <CardHeader>
            <CardTitle>Upload Your Image</CardTitle>
         </CardHeader>

         <CardContent className="overflow-y-auto mt-4">
            <p className="text-muted-foreground">
               Upload a professional image. It will be featured in your resume
               and cover letter templates that include an image section. A good
               image can make a strong impression!
            </p>

            <Dropzone />
         </CardContent>
      </Card>
   );
};
